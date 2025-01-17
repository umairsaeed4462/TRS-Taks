import { AfterViewInit, Component, effect, ElementRef, inject, input, InputSignal, OnInit, output, OutputEmitterRef, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { InputComponent } from '../../../core/components/input/input.component';
import { EventForm, EventsModel } from '../../../core/models/events.model';
import { UtilityService } from '../../../core/services/utility.service';
import { pastDateValidator } from '../../../core/validators/past-date-not-alllow';
import { EventApiService } from '../../../core/services/API\'s/event-api.service';
import { Category } from '../../../core/models/category.model';
import { CategoryApiService } from '../../../core/services/API\'s/category-api.service';
import { HttpResponseModel } from '../../../core/models/core.model';
import { Options, SelectOptionComponent } from '../../../core/components/select-option/select-option.component';
import { AuthApiService } from '../../../core/services/API\'s/auth-api.service';
import { UserModel } from '../../../core/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-model',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent, SelectOptionComponent],
  templateUrl: './event-model.component.html',
  styleUrl: './event-model.component.scss'
})
export class EventModelComponent implements AfterViewInit, OnInit {

  public eventDetail: InputSignal<EventsModel | null> = input<EventsModel | null>(null);
  public categoryList: WritableSignal<Category[]> = signal<Category[]>([]);
  public userList: WritableSignal<UserModel[]> = signal<UserModel[]>([]);
  public memberList: WritableSignal<string[]> = signal<string[]>([]);
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public isEdit: WritableSignal<boolean> = signal<boolean>(false);
  public isAddCategory: WritableSignal<boolean> = signal<boolean>(false);
  public isAddMembers: WritableSignal<boolean> = signal<boolean>(false);
  public eventForm: FormGroup<EventForm> = new FormGroup<EventForm>({
    title: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, pastDateValidator()]),
    category: new FormControl('', [Validators.required, pastDateValidator()])
  });
  public member: FormControl = new FormControl('')

  public onSave: OutputEmitterRef<EventsModel> = output<EventsModel>();

  private utilitySer: UtilityService = inject(UtilityService);
  private categorySer: CategoryApiService = inject(CategoryApiService);
  private userSer: AuthApiService = inject(AuthApiService);
  private toastSer: ToastrService = inject(ToastrService);

  public closeBtn: Signal<ElementRef<HTMLButtonElement> | undefined> = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  public constructor() {
    effect(() => {
      if (this.eventDetail()) {
        this.updateView();
      }
    })
  }

  public ngOnInit(): void {
    this.fetchUserList();
  }

  public ngAfterViewInit(): void {
    this.fetchCategories();
    this.eventForm.get('date')?.setValue(this.utilitySer.formatDateString((new Date()).toISOString()));
  }

  private fetchCategories(): void {
    this.categorySer.getAllCategories().subscribe((res: HttpResponseModel)=>{
      this.categoryList.set((res.data as Array<Category>));
    })
  }

  private fetchUserList(): void {
    this.userSer.getUser().subscribe((res: HttpResponseModel)=> {
      this.userList.set((res.data as Array<UserModel>));
    })
  }

  public updateView(): void {
    setTimeout(() => {
      this.isEdit.set(true);
      this.eventForm.patchValue({
        title: this.eventDetail()!.title,
        location: this.eventDetail()!.location,
        description: this.eventDetail()!.description,
        date: this.utilitySer.formatDateString(this.eventDetail()!.date),
      });
    }, 200);
  }

  public onAddEvent(): void {
    const payload:any = (this.eventForm.value);
    payload.attendees = this.memberList();
    this.onSave.emit(payload);
  }

  public onCloseModel(): void {
    (this.closeBtn()?.nativeElement as HTMLButtonElement).click();
  }

  public getCategories(): Options[] {
    return this.categoryList().map((cat: Category) => ({ _id: cat?._id, label: cat.title })) as Options[];
  }

  public onAddCategory(category: string): void {
    this.categorySer.createCategory({ title: category }).subscribe((res: HttpResponseModel) => {
      this.isAddCategory.set(false);
      this.fetchCategories();
    });
  }

  public onAddMember(): void {
    if(this.memberList().includes(this.member.value)){
      this.toastSer.error('Member is already added');
      return;
    }
    this.memberList().push(this.member.value);
    this.member.setValue('');
    
  }

  public getUser(id: string): UserModel {
    return this.userList().find((user: UserModel) => user._id === id)!;
  }

  public onRemoveMember(user: UserModel): void {
    this.memberList.set(this.memberList().filter ( member => member != user._id));
  }

}
