import { PreviewModal } from "../../PreviewModal";
import { renderMediaPreview } from "../../Preview";

export class VideoUploaderWidget {
  element: HTMLElement;
  fileInput: HTMLInputElement;
  checkboxInput: HTMLInputElement | null;
  emptyMarker: HTMLElement | null;
  canDelete: boolean = false;
  dragging: boolean = false;
  canPreview: boolean = true;

  raw: string | null = null;
  file: File | null = null;

  constructor(element: HTMLElement) {
    // get main elements
    this.element = element;
    const fileInput =
      element.querySelector<HTMLInputElement>("input[type=file]");
    const checkBoxInput = element.querySelector<HTMLInputElement>(
      "input[type=checkbox]"
    );
    // check if file input exists
    if (!fileInput) {
      throw new Error("no-file-input-found");
    }
    // store variables
    this.fileInput = fileInput;
    this.checkboxInput = checkBoxInput;
    this.emptyMarker = element.querySelector<HTMLElement>(".uuw-empty");
    this.canDelete = element.getAttribute("data-candelete") === "true";
    this.dragging = false;

    // add events
    this.fileInput.addEventListener("change", this.onFileInputChange);
    if (this.emptyMarker) {
      this.emptyMarker.addEventListener("click", this.onEmptyMarkerClick);
    }
    this.element.addEventListener("dragenter", this.onDragEnter);
    this.element.addEventListener("dragover", this.onDragOver);
    this.element.addEventListener("dragleave", this.onDragLeave);
    this.element.addEventListener("dragend", this.onDragLeave);
    this.element.addEventListener("drop", this.onDrop);

    // init
    this.raw = element.getAttribute("data-raw");
    this.file = null;
    this.renderWidget();
  }

  updateCheckBoxAndEmptyState() {
    if (!this.file && !this.raw) {
      this.element.classList.remove("non-empty");
      if (this.checkboxInput) {
        this.checkboxInput.checked = true;
      }
    } else {
      this.element.classList.add("non-empty");
      if (this.checkboxInput) {
        this.checkboxInput.checked = false;
      }
    }
  }

  renderWidget() {
    this.updateCheckBoxAndEmptyState();

    Array.from(this.element.querySelectorAll(".uuw-file-preview")).forEach(
      (item) => this.element.removeChild(item)
    );
    if (this.file) {
      const url = URL.createObjectURL(this.file);
      this.element.appendChild(
        renderMediaPreview(url, this.canDelete, this.canPreview, 'video')
      );
    } else if (this.raw) {
      this.element.appendChild(
        renderMediaPreview(this.raw, this.canDelete, this.canPreview, 'video')
      );
    }
    Array.from(this.element.querySelectorAll(".uuw-file-preview")).forEach(
      (item) => item.addEventListener("click", this.onVideoPreviewClick)
    );
  }

  performDeleteVideo = (previewElement?: Element | null) => {
    previewElement?.parentElement?.removeChild(previewElement);
    if (this.checkboxInput) {
      this.checkboxInput.checked = true;
    }
    this.fileInput.value = "";
    this.file = null;
    this.raw = null;
    this.renderWidget();
  };

  performPreviewVideo = (previewElement?: Element | null) => {
    let video = previewElement?.querySelector("video");
    if (video) {
      video = video.cloneNode(true) as HTMLVideoElement;
      PreviewModal.createPreviewModal(video);
      PreviewModal.openPreviewModal();
    }
  };

  onEmptyMarkerClick = () => {
    this.fileInput.click();
  };

  onDrop = (e: DragEvent) => {
    e.preventDefault();

    this.dragging = false;
    this.element.classList.remove("drop-zone");

    if (e.dataTransfer?.files.length) {
      this.fileInput.files = e.dataTransfer.files;
      this.file = this.fileInput.files[0];
      this.raw = null;
      this.renderWidget();
    }
  };

  onDragEnter = () => {
    this.dragging = true;
    this.element.classList.add("drop-zone");
  };

  onDragOver = (e: DragEvent) => {
    if (e) {
      e.preventDefault();
    }
  };

  onDragLeave = (e: DragEvent) => {
    if (
      e.relatedTarget &&
      (e.relatedTarget as HTMLElement).closest(".uuw-root") === this.element
    ) {
      return;
    }
    this.dragging = false;
    this.element.classList.remove("drop-zone");
  };

  onFileInputChange = () => {
    if (this.fileInput.files?.length) {
      this.file = this.fileInput.files[0];
    }
    this.renderWidget();
  };

  onVideoPreviewClick = (e: Event) => {
    if (e && e.target) {
      const targetElement = e.target as HTMLElement;
      if (targetElement.closest(".uuw-delete-icon")) {
        const element = targetElement.closest(".uuw-file-preview");
        return this.performDeleteVideo(element);
      } else if (targetElement.closest(".uuw-preview-icon")) {
        const element = targetElement.closest(".uuw-file-preview");
        return this.performPreviewVideo(element);
      }
    }
    this.fileInput.click();
  };
}
