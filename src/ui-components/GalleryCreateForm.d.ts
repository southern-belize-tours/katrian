/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GalleryCreateFormInputValues = {
    name?: string;
    long_description?: string;
    alts?: string[];
    directory?: string;
    admin_upload_only?: boolean;
};
export declare type GalleryCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    long_description?: ValidationFunction<string>;
    alts?: ValidationFunction<string>;
    directory?: ValidationFunction<string>;
    admin_upload_only?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GalleryCreateFormOverridesProps = {
    GalleryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    long_description?: PrimitiveOverrideProps<TextFieldProps>;
    alts?: PrimitiveOverrideProps<TextFieldProps>;
    directory?: PrimitiveOverrideProps<TextFieldProps>;
    admin_upload_only?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type GalleryCreateFormProps = React.PropsWithChildren<{
    overrides?: GalleryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GalleryCreateFormInputValues) => GalleryCreateFormInputValues;
    onSuccess?: (fields: GalleryCreateFormInputValues) => void;
    onError?: (fields: GalleryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GalleryCreateFormInputValues) => GalleryCreateFormInputValues;
    onValidate?: GalleryCreateFormValidationValues;
} & React.CSSProperties>;
export default function GalleryCreateForm(props: GalleryCreateFormProps): React.ReactElement;
