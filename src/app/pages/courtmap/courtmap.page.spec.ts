import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourtmapPage } from './courtmap.page';

describe('CourtmapPage', () => {
  let component: CourtmapPage;
  let fixture: ComponentFixture<CourtmapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtmapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourtmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
