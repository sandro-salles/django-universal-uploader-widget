import PreviewIcon from "../../Icons/PreviewIcon";
import DeleteIcon from "../../Icons/DeleteIcon";

export class EditorVideo {
  element: HTMLElement;
  canPreview: boolean;
  onDelete: ((video: EditorVideo) => void) | null;

  constructor(element: HTMLElement, canPreview: boolean, newVideo?: string) {
    this.element = element;
    this.canPreview = canPreview;
    this.onDelete = null;

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    if (!!newVideo) {
      this.render(newVideo);
    } else {
      const inputs = this.removeAndGetInputs();
      const link = this.getAndUpdateRawVideo();

      this.element.innerHTML = "";
      inputs.forEach((item) => this.element.appendChild(item));
      this.render(link);
    }
  }

  private removeAndGetInputs() {
    return Array.from(
      this.element.querySelectorAll<HTMLInputElement>(
        "input[type=hidden], input[type=checkbox], input[type=file]"
      )
    ).map((item) => {
      item.parentElement?.removeChild(item);
      return item;
    });
  }

  private getAndUpdateRawVideo() {
    let rawVideo = document.querySelector("p.file-upload a");
    if (this.element.classList.contains("empty-form")) {
      rawVideo = null;
    }
    let hrefAttr: string | null = null;
    if (rawVideo) {
      hrefAttr = rawVideo.getAttribute("href");
      if (hrefAttr) {
        this.element.setAttribute("data-raw", hrefAttr);
      }
    }
    return hrefAttr;
  }

  private render(link: string | null) {
    if (!link) {
      return;
    }
    let delete_icon: Element | null = null;
    const related = this.element.closest(".inline-related");

    related?.addEventListener("click", this.handleClick);
    related
      ?.querySelector("input[type=file]")
      ?.addEventListener("change", this.handleInputChange);

    if (related?.getAttribute("data-candelete") === "true") {
      delete_icon = document.createElement("span");
      delete_icon.classList.add("uuw-delete-icon");
      delete_icon.innerHTML = DeleteIcon;
    }
    if (this.canPreview) {
      const span = document.createElement("span");
      span.classList.add("uuw-preview-icon");
      if (related?.getAttribute("data-candelete") !== "true") {
        span.classList.add("uuw-only-preview");
      }
      span.innerHTML = PreviewIcon;
      this.element.appendChild(span);
    }
    const video = document.createElement("video");
    video.src = link;
    this.element.appendChild(video);
    if (delete_icon) {
      this.element.appendChild(delete_icon);
    }
  }

  private handleClick(e: Event) {
    if (!e || !e.target) {
      return;
    }
    const target = e.target as HTMLElement;
    const item = target.closest(".inline-related");
    if (target.closest(".uuw-delete-icon") && !!this.onDelete) {
      this.onDelete(this);
      return;
    }

    const fileInput = item?.querySelector<HTMLInputElement>("input[type=file]");
    if (e.target === fileInput) {
      return;
    }
    fileInput?.click();
  }

  private handleInputChange(e: Event) {
    if (!e || !e.target || (e.target as any).tagName !== "INPUT") {
      return;
    }
    const fileInput = e.target as HTMLInputElement;
    var files = fileInput.files;
    if (!files?.length) {
      return;
    }
    const videoTag = fileInput
      .closest(".inline-related")
      ?.querySelector("video");
    if (videoTag) {
      videoTag.src = URL.createObjectURL(files[0]);
    }
  }
}
