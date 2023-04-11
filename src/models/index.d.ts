import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly itemName: string;
  readonly itemImageUrl?: string | null;
  readonly itemPrice: number;
  readonly itemQuantity: number;
  readonly itemLink: string;
  readonly itemStatus?: string | null;
  readonly guestName?: string | null;
  readonly guestMessage?: string | null;
  readonly itemTimestam?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly itemName: string;
  readonly itemImageUrl?: string | null;
  readonly itemPrice: number;
  readonly itemQuantity: number;
  readonly itemLink: string;
  readonly itemStatus?: string | null;
  readonly guestName?: string | null;
  readonly guestMessage?: string | null;
  readonly itemTimestam?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Item = LazyLoading extends LazyLoadingDisabled ? EagerItem : LazyItem

export declare const Item: (new (init: ModelInit<Item>) => Item) & {
  copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}