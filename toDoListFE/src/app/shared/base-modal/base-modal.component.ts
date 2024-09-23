import {
  AfterViewInit,
  Component,
  createComponent,
  ElementRef,
  HostListener,
  Type,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../../modules/modals/modal.service';
import { Options } from './modalOptions';
import { fromEvent, Observable, zip } from 'rxjs';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.css',
})
export class BaseModalComponent implements AfterViewInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
  options!: Options | undefined;

  modalAnimationEnd!: Observable<Event>;
  modalLeaveAnimation!: string;
  overlayLeaveAnimation!: string;

  overlayAnimationEnd!: Observable<Event>;
  modalLeaveTiming!: number;
  overlayLeaveTiming!: number;

  constructor(
    private modalService: ModalService,
    private element: ElementRef
  ) {}

  @HostListener('document:keydown.escape')
  onEscape() {
    this.modalService.close();
  }
  onClose() {
    this.modalService.close();
  }
  ngAfterViewInit(): void {
    this.options = this.modalService.options;
    this.addOptions();
    this.addEnterAnimations();
  }
  addEnterAnimations() {
    this.modal.nativeElement.style.animation =
      this.options?.animations?.modal?.enter || '';

    this.overlay.nativeElement.style.animation =
      this.options?.animations?.overlay?.enter || '';
  }
  private setOptions() {
    this.modal.nativeElement.style.minWidth =
      this.options?.size?.minWidth || 'auto';
    this.modal.nativeElement.style.maxWidth =
      this.options?.size?.maxWidth || 'auto';
    this.modal.nativeElement.style.width = this.options?.size?.width || 'auto';
    this.modal.nativeElement.style.minHeight =
      this.options?.size?.minHeight || 'auto';
    this.modal.nativeElement.style.maxHeight =
      this.options?.size?.maxHeight || 'auto';
    this.modal.nativeElement.style.height =
      this.options?.size?.height || 'auto';
  }
  private setEndAnimation() {
    this.modalLeaveAnimation = this.options?.animations?.modal?.leave || '';
    this.overlayLeaveAnimation = this.options?.animations?.overlay?.leave || '';

    this.modalAnimationEnd = this.animationendEvent(this.modal.nativeElement);
    this.overlayAnimationEnd = this.animationendEvent(
      this.overlay.nativeElement
    );
    this.modalLeaveTiming = this.getAnimationTime(this.modalLeaveAnimation);
    this.overlayLeaveTiming = this.getAnimationTime(this.overlayLeaveAnimation);
  }
  addOptions() {
    this.setOptions();
    this.setEndAnimation();
  }
  animationendEvent(element: HTMLDivElement): Observable<Event> {
    return fromEvent(element, 'animationend');
  }
  getAnimationTime(animation: string): number {
    //takes a string like ease-in-out 1s and converts it to only the time in seconds.
    // in the example above, this method would convert the string to be 1 as a number.

    let animationTime = 0;
    const animationTokens = animation.split(' ');
    for (const token in animationTokens) {
      const alteredToken = +token.replace('/s$/', '');
      if (!isNaN(alteredToken)) {
        return alteredToken;
      }
    }
    return 0;
  }
  removeElementIfNoAnimation(element: HTMLDivElement, animation: string) {
    if (!animation) element.remove();
  }
  close() {
    this.modal.nativeElement.style.animation = this.modalLeaveAnimation;
    this.overlay.nativeElement.style.animation = this.overlayLeaveAnimation;

    if (
      !this.options?.animations?.modal?.leave &&
      !this.options?.animations?.overlay?.leave
    ) {
      this.modalService.options = undefined;
      this.element.nativeElement.remove();
      return;
    }

    this.removeElementIfNoAnimation(
      this.modal.nativeElement,
      this.modalLeaveAnimation
    );
    this.removeElementIfNoAnimation(
      this.overlay.nativeElement,
      this.overlayLeaveAnimation
    );
    if (this.modalLeaveTiming > this.overlayLeaveTiming) {
      this.modalAnimationEnd.subscribe(() => {
        this.element.nativeElement.remove();
      });
    } else if (this.modalLeaveTiming < this.overlayLeaveTiming) {
      this.overlayAnimationEnd.subscribe(() => {
        this.element.nativeElement.remove();
      });
    } else {
      zip(this.modalAnimationEnd, this.overlayAnimationEnd).subscribe(() => {
        this.element.nativeElement.remove();
      });
    }
    this.modalService.options = undefined;
  }
}
