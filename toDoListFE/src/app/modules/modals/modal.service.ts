import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Options } from '../../shared/base-modal/modalOptions';
import { BaseModalComponent } from '../../shared/base-modal/base-modal.component';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  newModalComponent!: ComponentRef<BaseModalComponent>;
  options!: Options | undefined;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open(component: Type<unknown>, options?: Options) {
    this.openWithComponent(component);
    this.options = options;
  }
  private openWithComponent(component: Type<unknown>) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });
    this.newModalComponent = createComponent(BaseModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });
    document.body.appendChild(this.newModalComponent.location.nativeElement);

    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
  }
  close() {
    this.newModalComponent.instance.close();
  }
}
