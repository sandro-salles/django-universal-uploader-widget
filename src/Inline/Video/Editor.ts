import {
  getInlineGroupOrThrow,
  parseFormSet,
  UniversalUploaderInlineFormSet,
  UniversalUploaderInlineManagementInputs,
  updateAllElementsIndexes,
  getManagementInputs,
  getAddButton,
  createTempFileInput,
} from "../Utils";
import { EditorVideo } from "./EditorVideo";

export class VideoUploaderInline {
  element: HTMLElement;
  inlineGroup: HTMLElement;
  addVideoButton: HTMLElement;
  tempFileInput: HTMLInputElement | null;
  inlineFormset: UniversalUploaderInlineFormSet;
  management: UniversalUploaderInlineManagementInputs;
  next: number;
  maxCount: number;
  videos: EditorVideo[];
  canPreview: boolean;

  constructor(element: HTMLElement) {
    this.canPreview = true;

    this.tempFileInput = null;
    this.element = element;
    this.inlineGroup = getInlineGroupOrThrow(this.element);
    this.inlineFormset = parseFormSet(this.inlineGroup);
    this.management = getManagementInputs(this.inlineFormset.options.prefix);
    this.next = 0;
    if (this.management.maxNumForms.value === "") {
      this.maxCount = Number.MAX_SAFE_INTEGER;
    } else {
      this.maxCount = parseInt(this.management.maxNumForms.value, 10);
    }
    this.addVideoButton = getAddButton(this.element);

    this.updateEmpty();
    this.updateAllIndexes();

    this.videos = Array.from(
      this.element.querySelectorAll<HTMLElement>(".inline-related")
    ).map((item) => {
      const editorVideo = new EditorVideo(item, this.canPreview);
      editorVideo.onDelete = this.handleVideoDelete;
      return editorVideo;
    });

    this.bindVariables();
    this.bindEvents();

    this.element.addEventListener("dragenter", this.handleDragEnter);
    this.element.addEventListener("dragover", this.handleDragOver);
    this.element.addEventListener("dragleave", this.handleDragLeave);
    this.element.addEventListener("dragend", this.handleDragLeave);
    this.element.addEventListener("drop", this.handleDrop);
  }

  bindVariables() {
    this.handleAddVideo = this.handleAddVideo.bind(this);
    this.handleTempFileInputChange = this.handleTempFileInputChange.bind(this);
  }

  bindEvents() {
    this.addVideoButton.addEventListener("click", this.handleAddVideo);
    this.element
      .querySelector(".uuw-empty")
      ?.addEventListener("click", this.handleAddVideo);
  }

  updateEmpty() {
    const { length } = this.element.querySelectorAll(
      ".inline-related:not(.empty-form):not(.deleted)"
    );
    this.element.classList.toggle("non-empty", length > 0);
  }

  updateAllIndexes() {
    const { prefix } = this.inlineFormset.options;
    const { length: count } = Array.from(
      this.element.querySelectorAll<HTMLElement>(
        ".inline-related:not(.empty-form)"
      )
    ).map((item, index) => {
      updateAllElementsIndexes(item, prefix, index);
      return item;
    });

    this.next = count;
    this.management.totalForms.value = String(this.next);
    this.addVideoButton.classList.toggle(
      "visible-by-number",
      this.maxCount - this.next > 0
    );
  }

  createFromEmptyTemplate(): HTMLElement {
    const template = this.element.querySelector(".inline-related.empty-form");
    if (!template) {
      throw new Error("no-empty-template");
    }

    const row = <HTMLElement>template.cloneNode(true);
    row.classList.remove("empty-form");
    row.classList.remove("last-related");
    row.setAttribute("data-candelete", "true");
    row.id = `${this.inlineFormset.options.prefix}-${this.next}`;

    template.parentElement?.insertBefore(row, template);

    return row;
  }

  addFile(fileToAdd: File | null = null) {
    const row = this.createFromEmptyTemplate();

    let file = null;
    if (fileToAdd) {
      file = fileToAdd;
      const rowFileInput = row.querySelector(
        "input[type=file]"
      ) as HTMLInputElement;

      const dataTransferList = new DataTransfer();
      dataTransferList.items.add(file);

      rowFileInput.files = dataTransferList.files;
    } else {
      if (!this.tempFileInput) {
        throw new Error("no-temp-input-for-upload");
      }
      file = (this.tempFileInput.files || [null])[0];
      if (!file) {
        throw new Error("no-file-in-input");
      }

      const rowFileInput = row.querySelector(
        "input[type=file]"
      ) as HTMLInputElement;
      const parent = rowFileInput.parentElement as HTMLElement;

      const className = rowFileInput.className;
      const name = rowFileInput.getAttribute("name");
      parent.removeChild(rowFileInput);

      this.tempFileInput.className = className;
      this.tempFileInput.setAttribute("name", name || "");
      this.tempFileInput.parentElement?.removeChild(this.tempFileInput);
      parent.appendChild(this.tempFileInput);
      this.tempFileInput = null;
    }

    const editorVideo = new EditorVideo(row, true, URL.createObjectURL(file));
    editorVideo.onDelete = this.handleVideoDelete;
    this.videos.push(editorVideo);
    this.updateEmpty();
    this.updateAllIndexes();
  }

  handleTempFileInputChange() {
    const filesList = this.tempFileInput?.files;
    if (!filesList || filesList.length <= 0) {
      return;
    }
    this.addFile();
  }

  handleAddVideo() {
    if (!this.tempFileInput) {
      this.tempFileInput = createTempFileInput("video/*");
      this.tempFileInput.addEventListener(
        "change",
        this.handleTempFileInputChange
      );
      this.element.appendChild(this.tempFileInput);
    }
    this.tempFileInput.click();
  }

  handleVideoDelete = (image: EditorVideo) => {
    if (image.element.getAttribute("data-raw")) {
      image.element.classList.add("deleted");
      const checkboxInput = image.element.querySelector(
        "input[type=checkbox]"
      ) as HTMLInputElement;
      checkboxInput.checked = true;
    } else {
      image.element.parentElement?.removeChild(image.element);
    }
    this.videos = this.videos.filter((item) => item !== image);
    this.updateEmpty();
  };

  handleDrop = (e: DragEvent) => {
    e.preventDefault();

    this.element.classList.remove("drop-zone");
    if (e.dataTransfer?.files.length) {
      for (const file of e.dataTransfer.files) {
        this.addFile(file);
      }
    }
  };

  handleDragEnter = () => {
    this.element.classList.add("drop-zone");
  };

  handleDragOver = (e: DragEvent) => {
    if (e) {
      e.preventDefault();
    }
  };

  handleDragLeave = (e: DragEvent) => {
    if (
      e.relatedTarget &&
      (e.relatedTarget as HTMLElement).closest(".uuw-inline-root") ===
        this.element
    ) {
      return;
    }
    this.element.classList.remove("drop-zone");
  };
}
