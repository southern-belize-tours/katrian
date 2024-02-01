/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TuneUpdateFormInputValues = {
    name?: string;
    artist?: string;
};
export declare type TuneUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    artist?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TuneUpdateFormOverridesProps = {
    TuneUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    artist?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TuneUpdateFormProps = React.PropsWithChildren<{
    overrides?: TuneUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tune?: any;
    onSubmit?: (fields: TuneUpdateFormInputValues) => TuneUpdateFormInputValues;
    onSuccess?: (fields: TuneUpdateFormInputValues) => void;
    onError?: (fields: TuneUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TuneUpdateFormInputValues) => TuneUpdateFormInputValues;
    onValidate?: TuneUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TuneUpdateForm(props: TuneUpdateFormProps): React.ReactElement;
