import { TsPdfViewer, TsPdfViewerOptions } from "ts-pdf";
import { finder } from "@medv/finder";

export const PreviewModal = {
  openPreviewModal: () => {
    const modal = document.getElementById("uuw-modal-element");
    if (!modal) {
      return;
    }
    setTimeout(() => {
      modal.classList.add("visible");
      modal.classList.remove("hide");
      document.body.style.overflow = "hidden";
    }, 50);
  },
  closePreviewModal: () => {
    document.body.style.overflow = "auto";
    const modal = document.getElementById("uuw-modal-element");
    if (modal) {
      modal.classList.remove("visible");
      modal.classList.add("hide");
      setTimeout(() => {
        modal.parentElement?.removeChild(modal);
      }, 300);
    }
  },
  onModalClick: (e: Event) => {
    if (e && e.target) {
      const element = e.target as HTMLElement;
      if (
        element.closest(
          "img.uuw-modal-file-preview-item, div.uuw-modal-file-preview-item"
        )
      ) {
        return;
      }
    }
    PreviewModal.closePreviewModal();
  },
  createPreviewModal: (
    file: HTMLImageElement | HTMLDivElement | HTMLVideoElement
  ): HTMLElement => {
    file.className = "";
    file.classList.add("uuw-modal-file-preview-item");

    const modal = document.createElement("div");
    modal.id = "uuw-modal-element";
    modal.classList.add("uuw-modal", "hide");
    modal.addEventListener("click", PreviewModal.onModalClick);

    const preview = document.createElement("div");
    preview.classList.add("uuw-modal-file-preview");
    preview.innerHTML =
      '<span class="uuw-modal-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="100%" height="100%"><path xmlns="http://www.w3.org/2000/svg" d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path></svg></span>';
    preview.appendChild(file);
    modal.appendChild(preview);

    document.body.appendChild(modal);
    return modal;
  },
  createPdfPreviewModal: async (url: string): Promise<HTMLElement> => {
    const file = document.createElement("div");
    file.classList.add("uuw-modal-file-preview-item");
    file.classList.add("uuw-modal-pdf-preview-item");

    const modal = document.createElement("div");
    modal.id = "uuw-modal-element";
    modal.classList.add("uuw-modal", "hide");
    modal.addEventListener("click", PreviewModal.onModalClick);

    const preview = document.createElement("div");
    preview.classList.add("uuw-modal-file-preview");
    preview.innerHTML =
      '<span class="uuw-modal-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="100%" height="100%"><path xmlns="http://www.w3.org/2000/svg" d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path></svg></span>';
    preview.appendChild(file);
    modal.appendChild(preview);

    document.body.appendChild(modal);

    const options: TsPdfViewerOptions = {
      containerSelector: finder(file),
      workerSource: "/static/admin/vendor/pdf.worker.min.js",
      fileButtons: [],
      disabledModes: ["hand", "annotation", "comparison"],
    };

    const viewer = new TsPdfViewer(options);
    await viewer.openPdfAsync(url).then(() => {
      let style = document.createElement("style");

      style.innerHTML = `
          #viewer { top: 0 !important; }
          .page-container {
              margin-top: 0 !important;
          }
  
          #top-panel {
              display: none !important;
          }  

          #rotator {
            display: none !important;
          }
      `;

      file.shadowRoot?.appendChild(style);
    });

    return modal;
  },
};
