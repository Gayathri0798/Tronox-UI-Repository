import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TileLayoutComponent } from './tile-layout.component';

describe('TileLayoutComponent', () => {
  let component: TileLayoutComponent;
  let fixture: ComponentFixture<TileLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TileLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
