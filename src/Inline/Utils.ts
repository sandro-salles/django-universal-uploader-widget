export function getInlineGroupOrThrow(element: HTMLElement): HTMLElement {
  const inlineGroup = element.closest<HTMLElement>(".inline-group");
  if (!inlineGroup) {
    throw new Error("no-inline-group-found");
  }
  return inlineGroup;
}

export interface UniversalUploaderInlineFormSet {
  name: string;
  options: {
    prefix: string;
    addText: string;
    deleteText: string;
  };
}

export function parseFormSet(
  element: HTMLElement
): UniversalUploaderInlineFormSet {
  const formSetDataString = element.getAttribute("data-inline-formset");
  if (!formSetDataString) {
    throw new Error("no-formset-data-found");
  }
  return <UniversalUploaderInlineFormSet>JSON.parse(formSetDataString);
}

export function updateElementIndex(
  element: HTMLElement,
  prefix: string,
  index: number
): void {
  const findRegex = new RegExp(`(${prefix}-(\\d+|__prefix__))`);
  const replacement = `${prefix}-${index}`;
  // replace at [for]
  const forAttr = element.getAttribute("for");
  if (forAttr) {
    element.setAttribute("for", forAttr.replace(findRegex, replacement));
  }
  // replace at [id]
  const idAttr = element.getAttribute("id");
  if (idAttr) {
    element.setAttribute("id", idAttr.replace(findRegex, replacement));
  }
  // replace at [name]
  const nameAttr = element.getAttribute("name");
  if (nameAttr) {
    element.setAttribute("name", nameAttr.replace(findRegex, replacement));
  }
}

export function updateAllElementsIndexes(
  element: HTMLElement,
  prefix: string,
  index: number
): void {
  updateElementIndex(element, prefix, index);
  Array.from(element.querySelectorAll<HTMLElement>("*")).forEach((childItem) =>
    updateElementIndex(childItem, prefix, index)
  );
}

export interface UniversalUploaderInlineManagementInputs {
  totalForms: HTMLInputElement;
  initialForms: HTMLInputElement;
  minNumForms: HTMLInputElement;
  maxNumForms: HTMLInputElement;
}

export function getManagementInputs(
  prefix: string
): UniversalUploaderInlineManagementInputs {
  const totalForms = document.querySelector<HTMLInputElement>(
    `#id_${prefix}-TOTAL_FORMS`
  );
  const initialForms = document.querySelector<HTMLInputElement>(
    `#id_${prefix}-INITIAL_FORMS`
  );
  const minNumForms = document.querySelector<HTMLInputElement>(
    `#id_${prefix}-MIN_NUM_FORMS`
  );
  const maxNumForms = document.querySelector<HTMLInputElement>(
    `#id_${prefix}-MAX_NUM_FORMS`
  );
  if (!totalForms || !initialForms || !minNumForms || !maxNumForms) {
    throw new Error("management-forms-not-found");
  }
  return { totalForms, initialForms, minNumForms, maxNumForms };
}

export function getAddButton(element: HTMLElement): HTMLElement {
  const addFileButton = element.querySelector<HTMLElement>(".uuw-add-file-btn");
  if (!addFileButton) {
    throw new Error("no-add-button-found");
  }
  return addFileButton;
}

export function createTempFileInput(accept: string): HTMLInputElement {
  const tempFileInput = document.createElement("input");
  tempFileInput.setAttribute("type", "file");
  tempFileInput.classList.add("temp_file");
  tempFileInput.setAttribute("accept", accept);
  tempFileInput.style.display = "none";
  return tempFileInput;
}
