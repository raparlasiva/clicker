import { Component, ViewChild, forwardRef } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { NG_VALUE_ACCESSOR, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

/*
  Generated class for the SignatureField component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

// tslint: ignore
@Component({
  selector: 'signature-field',
  templateUrl: 'build/components/signature-field/signature-field.html',
  directives: [
    REACTIVE_FORM_DIRECTIVES,
    SignaturePad,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureField),
      multi: true,
    },
  ],
})
export class SignatureField {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;

  public options: Object = {};

  public _signature: any = null;

  public propagateChange: Function = null;

  get signature(): any {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    console.log('set signature to ' + this._signature);
    this.propagateChange(this.signature);
  }

  public writeValue(value: any): void {
    if (!value) {
      return;
    }
    this._signature = value;
    this.signaturePad.fromDataURL(this.signature);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {
    // no-op
  }

  public ngAfterViewInit(): void {
    this.signaturePad.clear();
  }

  public drawComplete(): void {
    this.signature = this.signaturePad.toDataURL();
  }
}