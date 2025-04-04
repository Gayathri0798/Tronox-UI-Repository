import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TileService } from '@tronox-web/util-library';
import { TestResultDialogComponent } from '../test-result-dialog/test-result-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'lib-tile-dialog-box',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './tile-dialog-box.component.html',
  styleUrl: './tile-dialog-box.component.scss',
})
export class TileDialogBoxComponent implements AfterViewChecked, OnInit {
  hasResults = true;
  logs:any;
  logContent: any;
  constructor(
    public dialogRef: MatDialogRef<TileDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly tileService: TileService
  ) {}
  ngOnInit(): void {
    this.logContent = [];
  }
  // fetchLiveLogUpdates() {
  //   fetch("http://34.93.231.170:3000/get-log-updates")
  //     .then((response) => {
  //       const reader = response.body?.getReader();
  //       const decoder = new TextDecoder();

  //       const read = () => {
  //         reader?.read().then(({ value, done }) => {
  //           if (done) {
  //             console.log("✅ Log Streaming Finished");
  //             return;
  //           }
  //           const newLog = decoder.decode(value);
  //           console.log("🔹 Log Update Received:", newLog);
  //           this.logContent.push(newLog);
  //           read();
  //         });
  //       };

  //       read();
  //     })
  //     .catch(console.error);
  // }
  startLogStream(): void {
    const eventSource = new EventSource('http://localhost:3000/get-log-updates');
  
    eventSource.onmessage = (event) => {
      console.log("🔹 Log update received:", event.data);
      this.logContent.push(event.data);
    };
  
    eventSource.onerror = (err) => {
      console.error("❌ SSE error:", err);
      eventSource.close();
    };
  }
  

  fileName: string | null = null;
  fileUrl: string | null = null;
  fileUploaded = false;
  isProcessing = false;
  file: File | undefined;
  result: any;
  private dialog = inject(MatDialog);
  previousResultLength: any;
  wordFileBlob: Blob | null = null; // Variable to store the file
  testResults: any[] = [];
  @ViewChild('resultsContainer') resultsContainer: ElementRef | undefined;
  @ViewChild('resultsTable') resultsTable!: ElementRef;
  onFileSelected(event: any): void {
    this.file = event.target.files[0];

    if (this.file) {
      this.fileName = this.file.name;

      // Create a temporary URL for downloading
      const objectUrl = URL.createObjectURL(this.file);
      this.fileUrl = objectUrl;
      this.fileUploaded = true;
      this.wordFileBlob = null;
    }
  }

  runScript(): void {
    if (!this.file) return;
  
    this.isProcessing = true;
    this.wordFileBlob = null;
    this.result = ''; // Clear previous results
    this.logContent = []; // Clear logs before starting new execution

     // Start log stream *before* execution
    this.startLogStream();
    // Show terminal by adding class
    setTimeout(() => {
      const terminal = document.querySelector(".terminal");
      if (terminal) {
        terminal.classList.add("terminal-active");
      }
    }, 100);
  
    this.tileService.uploadAndFetchRealTimeRes(this.file, this.data?.tile?.appNamespec)
      .subscribe({
        next: (chunk) => {
          console.log('🔹 Raw Chunk Received:', chunk);
  
          // Regex to match only logs in the format: "YYYY-MM-DDTHH:mm:ss.SSSZ - Testcase failed at ..."
          const logPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z - Testcase failed at .+$/gm;
          const filteredLines = chunk.match(logPattern) || []; // Extract valid log lines
  
          if (filteredLines.length > 0) {
            this.logContent.push(...filteredLines);
            console.log('✅ Filtered Log Entries:', filteredLines);
          }
        },
        error: (error) => {
          console.error("❌ Error uploading file:", error);
          this.isProcessing = false;
          this.fetchTestResults();
        },
        complete: () => {
          console.log("✅ File processing complete");
          this.isProcessing = false;
          // this.fetchLiveLogUpdates();
          // this.startLogStream();
          this.fetchTestResults();
        },
      });
  }

  fetchTestResults() {
    this.tileService.getTestCaseResults().subscribe({
      next: (results) => {
        this.testResults = results;
        this.hasResults = this.testResults.length > 0;
        //console.log('Lav', this.testResults);
      },
      error: (err) => {
        console.error('Error fetching test results:', err);
      },
    });
  }

  openResultsDialog(result: any) {
    this.dialog.open(TestResultDialogComponent, {
      disableClose: true,
      height: '800px',
      width: '1200px',
      data: result,
    });
  }

  downloadTemplate(): void {
    if (!this.wordFileBlob) {
      alert('No file available for download. Please run the script first.');
      return;
    }

    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(this.wordFileBlob);
    a.href = objectUrl;
    a.download = `Screenshots_${Date.now()}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);

    console.log('📥 Word file downloaded');
  }

  closeDialog(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    URL.revokeObjectURL(this.fileUrl!);
    this.dialogRef.close();
  }

  scrollToBottom() {
    if (this.resultsContainer) {
      this.resultsContainer.nativeElement.scrollTop =
        this.resultsContainer.nativeElement.scrollHeight;
    }
  }

  ngAfterViewChecked() {
    this.adjustDialogHeight();
    if (
      this.resultsContainer &&
      this.result.length > this.previousResultLength
    ) {
      this.scrollToBottom();
    }
    this.previousResultLength = this.result.length;
  }

  adjustDialogHeight() {
    if (this.resultsTable?.nativeElement) {
      const tableHeight = this.resultsTable.nativeElement.offsetHeight;
      const baseHeight = 400; // Minimum dialog height
      const maxHeight = 700; // Prevent excessive height growth

      const newHeight = Math.min(baseHeight + tableHeight, maxHeight);
      this.dialogRef.updateSize('600px', `${newHeight}px`);
    }
  }
}
