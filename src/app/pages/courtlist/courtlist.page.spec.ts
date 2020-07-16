import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourtlistPage } from './courtlist.page';

describe('CourtlistPage', () => {
  let component: CourtlistPage;
  let fixture: ComponentFixture<CourtlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourtlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
