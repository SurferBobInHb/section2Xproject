import { ValidatorFn, AbstractControl } from "@angular/forms";

export function imageNameValidator(validImageExtensions: string []): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {

      if (! control || ! control.value)
        return null;

        for (let validImageExtension of validImageExtensions) {
            if ((control.value as string).endsWith(validImageExtension))
                return null;
        }

      return {invalidImageNameType: {value: control.value}} ;
    };
  }