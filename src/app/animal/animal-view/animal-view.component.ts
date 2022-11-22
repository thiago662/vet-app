import { Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimalViewService } from './animal-view.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-animal-view',
  templateUrl: './animal-view.component.html',
  styleUrls: ['./animal-view.component.scss']
})
export class AnimalViewComponent implements OnInit, OnDestroy {
  @ViewChild("contentUpdateAnimal") contentUpdateAnimal: any;
  @ViewChild("contentDeleteAnimal") contentDeleteAnimal: any;
  @ViewChild("contentCreateMessage") contentCreateMessage: any;
  @ViewChild("contentDeleteMessage") contentDeleteMessage: any;
  @ViewChild("contentCreateSchedule") contentCreateSchedule: any;
  @ViewChild("contentFinishSchedule") contentFinishSchedule: any;
  @ViewChild("contentDeleteSchedule") contentDeleteSchedule: any;

  animal: any;
  owners: any;
  users: any;
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    // maxHeight: 'auto',
    // width: 'auto',
    minWidth: '0',
    translate: 'no',
    // enableToolbar: true,
    // showToolbar: true,
    placeholder: 'Enter text here...',
    // defaultParagraphSeparator: '',
    // defaultFontName: '',
    // defaultFontSize: '',
    // fonts: [
    //   {class: 'arial', name: 'Arial'},
    //   {class: 'times-new-roman', name: 'Times New Roman'},
    //   {class: 'calibri', name: 'Calibri'},
    //   {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    // ],
    customClasses: [
      // {
      //   name: 'quote',
      //   class: 'quote',
      // },
      // {
      //   name: 'redText',
      //   class: 'redText'
      // },
      // {
      //   name: 'titleText',
      //   class: 'titleText',
      //   tag: 'h1',
      // },
    ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    // sanitize: true,
    // toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
    sanitize: false,
  };

  animalForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    species: new FormControl('',[Validators.required]),
    breed: new FormControl('',[Validators.required]),
    sex: new FormControl('',[Validators.required]),
    birth_date: new FormControl('',[Validators.required]),
    active: new FormControl(true),
    owners: new FormArray([
    ]),
  });
  get ownerForms(): FormArray {
    return this.animalForm.get('owners') as FormArray;
  }
  messageForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',[Validators.required]),
    message: new FormControl('',[Validators.required]),
    body: new FormControl(''),
    interection_id: new FormControl(''),
    user_id: new FormControl(''),
    owner_id: new FormControl(''),
    animal_id: new FormControl(''),
    type: new FormControl('message'),
  });
  scheduleForm = new FormGroup({
    id: new FormControl(''),
    type: new FormControl('schedule'),
    title: new FormControl('',[Validators.required]),
    schedule_at: new FormControl('',[Validators.required]),
    time: new FormControl(''),
    body: new FormControl(''),
    finished: new FormControl(''),
    finish_at: new FormControl(''),
    answered: new FormControl(''),
    response_message: new FormControl(''),
    response_body: new FormControl(''),
    interection_id: new FormControl(''),
    user_id: new FormControl(''),
    owner_id: new FormControl(''),
    animal_id: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animalViewService: AnimalViewService,
    private modalService: NgbModal,
    public toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.showAnimal(this.route.snapshot.params['id']);
  }

  showAnimal(id: any) {
    this.animalViewService.showAnimal(id)
      .then((data: any) => {
        this.animal = data;

        this.animalForm.patchValue({
          id: data.id,
          name: data.name,
          species: data.species,
          breed: data.breed,
          sex: data.sex,
          birth_date: data.birth_date,
          active: data.active,
        });

        data.owners.forEach((element: any) => {
          this.ownerForms.push(new FormGroup({
            owner_id: new FormControl(element.id),
          }));
        });
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  deleteAnimal(id: any) {
    this.animalViewService.deleteAnimal(id)
      .then((data: any) => {
        this.toastService.show('Animal excluido com sucesso', { classname: 'bg-success text-light', delay: 10000 });

        this.router.navigate(['/animals']);
      })
      .catch((error: any) => {
        this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
        console.log(error);
      })
      .finally(() => {
      });
  }

  showOwnersOptions(param: any = null) {
    this.animalViewService.showOwnersOptions(param)
      .then((data: any) => {
        this.owners = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  showUsersOptions(param: any = null) {
    this.animalViewService.showUsersOptions(param)
      .then((data: any) => {
        this.users = data;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  deleteMessage(id: any) {
    this.animalViewService.deleteMessage(id)
      .then((data: any) => {
        this.toastService.show('Mensagem excluido com sucesso', { classname: 'bg-success text-light', delay: 10000 });
        this.reload();
      })
      .catch((error: any) => {
        this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
        console.log(error);
      })
      .finally(() => {
      });
  }

  deleteSchedule(id: any) {
    this.animalViewService.deleteSchedule(id)
      .then((data: any) => {
        this.toastService.show('Agendamento excluido com sucesso', { classname: 'bg-success text-light', delay: 10000 });
        this.reload();
      })
      .catch((error: any) => {
        this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
        console.log(error);
      })
      .finally(() => {
      });
  }

  addOwner(): void {
    this.ownerForms.push(new FormGroup({
      owner_id: new FormControl(''),
    }));
  }

  removeOwner(id: number) {
    this.ownerForms.removeAt(id);
  }

  openUpdateAnimalModal() {
    this.showOwnersOptions();
    this.modalService.open(this.contentUpdateAnimal, {ariaLabelledBy: 'modal-basic-title'});
  }

  openDeleteAnimalModal(animal: any) {
    this.modalService.open(this.contentDeleteAnimal, {ariaLabelledBy: 'modal-basic-title'})
      .result.then(data => {
        this.deleteAnimal(animal.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  openCreateMessageModal(id: any = null) {
    this.showOwnersOptions({'animal_id': this.animal.id});
    this.showUsersOptions({'role_ids[]': [3]});

    if (id != null) {
      this.animalViewService.showMessage(id)
        .then((data: any) => {
          this.messageForm.patchValue({
            id: data.id,
            title: data.title,
            message: data.message,
            body: data.body,
            interection_id: data.interection_id,
            user_id: data.user_id,
            owner_id: data.owner_id,
            animal_id: data.animal_id,
          });
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
        });
    } else {
      this.messageForm.patchValue({
        id: null,
        title: '',
        message: '',
        body: '',
        interection_id: '',
        user_id: '',
        owner_id: '',
        animal_id: '',
      });
    }

    this.modalService.open(this.contentCreateMessage, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  openDeleteMessageModal(message: any) {
    this.modalService.open(this.contentDeleteMessage, {ariaLabelledBy: 'modal-basic-title'})
      .result.then(data => {
        this.deleteMessage(message.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  openCreateScheduleModal(id: any = null) {
    this.scheduleForm.patchValue({
      id: null,
      title: '',
      schedule_at: '',
      time: '',
      body: '',
      finished: '',
      finish_at: '',
      answered: '',
      response_message: '',
      response_body: '',
      interection_id: '',
      user_id: '',
      owner_id: '',
      animal_id: '',
    });

    this.showOwnersOptions({'animal_id': this.animal.id});
    this.showUsersOptions({'role_ids[]': [3]});

    if (id != null) {
      this.animalViewService.showSchedule(id)
        .then((data: any) => {
          const date = new Date(data.schedule_at);

          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();

          const fullDate = [year, month, day].join('-');

          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();

          const fullTime = {hour: hours, minute: minutes, second: seconds};

          this.scheduleForm.patchValue({
            id: data.id,
            title: data.title,
            body: data.body,
            schedule_at: fullDate,
            time: fullTime,
            finished: data.finished,
            finish_at: data.finish_at,
            answered: data.answered,
            response_message: data.response_message,
            response_body: data.response_body,
            interection_id: data.interection_id,
            user_id: data.user_id,
            owner_id: data.owner_id,
            animal_id: data.animal_id,
          });
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
        });
    } else {
      this.scheduleForm.patchValue({
        id: null,
        title: '',
        schedule_at: '',
        time: '',
        body: '',
        finished: '',
        finish_at: '',
        answered: '',
        response_message: '',
        response_body: '',
        interection_id: '',
        user_id: '',
        owner_id: '',
        animal_id: '',
      });
    }

    this.modalService.open(this.contentCreateSchedule, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  openDeleteScheduleModal(schedule: any) {
    this.modalService.open(this.contentDeleteSchedule, {ariaLabelledBy: 'modal-basic-title'})
      .result.then(data => {
        this.deleteSchedule(schedule.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  openFinishScheduleModal(id: any) {
    this.animalViewService.showSchedule(id)
      .then((data: any) => {
        const date = new Date(data.schedule_at);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const fullDate = [year, month, day].join('-');

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const fullTime = {hour: hours, minute: minutes, second: seconds};

        this.scheduleForm.patchValue({
          id: data.id,
          title: data.title,
          body: data.body,
          schedule_at: fullDate,
          time: fullTime,
          finished: data.finished,
          finish_at: data.finish_at,
          answered: data.answered,
          response_message: data.response_message,
          response_body: data.response_body,
          interection_id: data.interection_id,
          user_id: data.user_id,
          owner_id: data.owner_id,
          animal_id: data.animal_id,
        });
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });

    this.modalService.open(this.contentFinishSchedule, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
      .result.then(data => {
        this.onSubmitToFinishSchedule(this.scheduleForm.value.id);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        this.scheduleForm.patchValue({
          id: '',
          title: '',
          schedule_at: '',
          time: '',
          body: '',
          finished: '',
          finish_at: '',
          answered: '',
          response_message: '',
          response_body: '',
          interection_id: '',
          user_id: '',
          owner_id: '',
          animal_id: '',
        });
      });
  }

  onSubmitToUpdateAnimal(): void {
    this.animalViewService.updateAnimal(this.animalForm.value?.id, this.animalForm.value)
      .then((data: any) => {
        this.toastService.show('Animal atualizado com sucesso', { classname: 'bg-success text-light', delay: 10000 });
      })
      .catch((error: any) => {
        this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
        console.log(error);
      })
      .finally(() => {
        this.animalForm.patchValue({
          id: '',
          name: '',
          species: '',
          breed: '',
          sex: '',
          birth_date: '',
        });

        this.ownerForms.clear();

        this.reload();
      });
  }

  onSubmitToCreateMessage(id: any = null): void {
    if (id == null) {
      this.messageForm.patchValue({
        animal_id: this.animal.id,
      });

      this.animalViewService.createMessage(this.messageForm.value)
        .then((data: any) => {
          this.toastService.show('Mensagem criada com sucesso', { classname: 'bg-success text-light', delay: 10000 });
        })
        .catch((error: any) => {
          this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
          console.log(error);
        })
        .finally(() => {
          this.messageForm.patchValue({
            id: '',
            title: '',
            message: '',
            body: '',
            interection_id: '',
            user_id: '',
            owner_id: '',
            animal_id: '',
          });

          this.reload();
        });
    } else {
      this.animalViewService.updateMessage(this.messageForm.value?.id, this.messageForm.value)
        .then((data: any) => {
          this.toastService.show('Mensagem atualizado com sucesso', { classname: 'bg-success text-light', delay: 10000 });
        })
        .catch((error: any) => {
          this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
          console.log(error);
        })
        .finally(() => {
          this.messageForm.patchValue({
            id: '',
            title: '',
            message: '',
            body: '',
            interection_id: '',
            user_id: '',
            owner_id: '',
            animal_id: '',
          });

          this.reload();
        });
    }
  }

  onSubmitToCreateSchedule(id: any = null): void {
    var schedule_at = this.scheduleForm.value.schedule_at
      + 'T' + ("00" + this.scheduleForm.value.time.hour).slice(-2)
      + ':' + ("00" + this.scheduleForm.value.time.minute).slice(-2)
      + ':' + ("00" + this.scheduleForm.value.time.second).slice(-2);

    this.scheduleForm.patchValue({
      schedule_at: schedule_at,
    });

    if (id == null) {
      this.scheduleForm.patchValue({
        animal_id: this.animal.id,
      });

      this.animalViewService.createSchedule(this.scheduleForm.value)
        .then((data: any) => {
          this.toastService.show('Agendamento criado com sucesso', { classname: 'bg-success text-light', delay: 10000 });
        })
        .catch((error: any) => {
          this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
          console.log(error);
        })
        .finally(() => {
          this.scheduleForm.patchValue({
            id: '',
            title: '',
            schedule_at: '',
            time: '',
            body: '',
            finished: '',
            finish_at: '',
            answered: '',
            response_message: '',
            response_body: '',
            interection_id: '',
            user_id: '',
            owner_id: '',
            animal_id: '',
          });

          this.reload();
        });
    } else {
      this.animalViewService.updateSchedule(this.scheduleForm.value?.id, this.scheduleForm.value)
        .then((data: any) => {
          this.toastService.show('Agendamento atualizado com sucesso', { classname: 'bg-success text-light', delay: 10000 });
        })
        .catch((error: any) => {
          this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
          console.log(error);
        })
        .finally(() => {
          this.scheduleForm.patchValue({
            id: '',
            title: '',
            schedule_at: '',
            time: '',
            body: '',
            finished: '',
            finish_at: '',
            answered: '',
            response_message: '',
            response_body: '',
            interection_id: '',
            user_id: '',
            owner_id: '',
            animal_id: '',
          });

          this.reload();
        });
    }
  }

  onSubmitToFinishSchedule(id: any): void {
    this.scheduleForm.patchValue({
      finished: true,
    });

    this.animalViewService.finishSchedule(this.scheduleForm.value?.id, this.scheduleForm.value)
      .then((data: any) => {
        this.toastService.show('Agendamento finalizado com sucesso', { classname: 'bg-success text-light', delay: 10000 });
      })
      .catch((error: any) => {
        this.toastService.show('Erro: ' + error.error.message, { classname: 'bg-danger text-light', delay: 10000 });
        console.log(error);
      })
      .finally(() => {
        this.scheduleForm.patchValue({
          id: '',
          title: '',
          schedule_at: '',
          time: '',
          body: '',
          finished: '',
          finish_at: '',
          answered: '',
          response_message: '',
          response_body: '',
          interection_id: '',
          user_id: '',
          owner_id: '',
          animal_id: '',
        });

        this.reload();
      });
  }

  print(text: any) {
    var printWindow = window.open('', '', 'height=400,width=800');
    if (printWindow) {
      // printWindow.open('', '', 'height=400,width=800');
      // printWindow.document.write('<html><head><title>DIV Contents</title>');
      // printWindow.document.write('</head><body >');
      printWindow.document.write(text);
      // printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

  printDiv(text: any) {
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    if (mywindow) {

      mywindow.document.write(`<html><head><title>${text}</title>`);
      mywindow.document.write('</head><body >');
      mywindow.document.write(text);
      // mywindow.document.write(document.getElementById(text).innerHTML);
      mywindow.document.write('</body></html>');

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      mywindow.close();

      return true;
    }
    return
  }

  reload() {
    this.ngOnInit();
  }

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
