import * as primitives from "../primitives";
import * as helpers from "../helpers";
import {
  TYPE,
  FALLBACKS,
  FieldDefinition,
  StringType,
  NumberType,
  BooleanType,
  DateType,
} from "./constants";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type RecordReturnType<T extends Record<string, FieldDefinition>> = {
  [K in keyof T]: T[K] extends FieldDefinition
    ? T[K] extends { type: StringType } | StringType
      ? string
      : T[K] extends { type: NumberType } | NumberType
        ? number
        : T[K] extends { type: DateType } | DateType
          ? Date
          : T[K] extends { type: BooleanType } | BooleanType
            ? boolean
            : T[K] extends
                  | { type: typeof TYPE.arrayElement }
                  | typeof TYPE.arrayElement
              ? T[K] extends { options: infer TArrayElementOptions }
                ? TArrayElementOptions extends readonly any[]
                  ? TArrayElementOptions[number]
                  : never
                : never
              : T[K] extends
                    | { type: typeof TYPE.arrayElements }
                    | typeof TYPE.arrayElements
                ? T[K] extends { options: infer TArrayElementOptions }
                  ? TArrayElementOptions extends readonly any[]
                    ? TArrayElementOptions[number][]
                    : never
                  : never
                : never
    : T[K] extends { type: typeof TYPE.featureFlags } | typeof TYPE.featureFlags
      ? Record<string, string | number | boolean>
      : never;
};

function generateRecord<T extends Record<string, FieldDefinition>>(
  fields: T,
  options: {
    index?: number;
  } = {}
): Prettify<RecordReturnType<T>> {
  const row: Record<string, any> = {};

  const personName = primitives.personName();

  for (const [key, field] of Object.entries(fields)) {
    const object: Record<string, any> =
      typeof field === "string" ? { type: field } : field;

    switch (object.type) {
      case TYPE.personName: {
        row[key] = personName.full;
        break;
      }
      case TYPE.personFirstName: {
        row[key] = personName.first;
        break;
      }
      case TYPE.personLastName: {
        row[key] = personName.last;
        break;
      }
      case TYPE.companyName: {
        row[key] = primitives.companyName();
        break;
      }
      case TYPE.phoneNumber: {
        row[key] = primitives.phoneNumber();
        break;
      }
      case TYPE.int: {
        row[key] = primitives.int(
          object.min ?? FALLBACKS.minInt,
          object.max ?? FALLBACKS.maxInt
        );
        break;
      }
      case TYPE.float: {
        row[key] = primitives.float(
          object.min ?? FALLBACKS.minFloat,
          object.max ?? FALLBACKS.maxFloat,
          object.decimals ?? FALLBACKS.floatDecimals
        );
        break;
      }
      case TYPE.index: {
        const idx = options.index;

        if (idx === undefined) {
          throw new Error(
            "No index provided. If generating a single recording, use the `int` type to generate an index."
          );
        }

        row[key] = idx;
        break;
      }
      case TYPE.email: {
        row[key] = primitives.email(personName);
        break;
      }
      case TYPE.featureFlags: {
        row[key] = primitives.featureFlags(
          object.count ?? FALLBACKS.featureFlagsCount
        );
        break;
      }
      case TYPE.uuid: {
        row[key] = primitives.uuid();
        break;
      }
      case TYPE.boolean: {
        row[key] = primitives.boolean(
          object.trueChance ?? FALLBACKS.trueChance
        );
        break;
      }
      case TYPE.date: {
        row[key] = primitives.date(
          object.min ?? FALLBACKS.minDate,
          object.max ?? FALLBACKS.maxDate
        );
        break;
      }
      case TYPE.arrayElement: {
        row[key] = helpers.array.pick(
          object.options ?? FALLBACKS.arrayElementOptions
        );
        break;
      }
      case TYPE.arrayElements: {
        const min = object.count ?? object.min ?? FALLBACKS.arrayElementsMin;
        const max = object.count ?? object.max ?? FALLBACKS.arrayElementsMax;

        const count = Math.floor(Math.random() * (max - min + 1)) + min;

        row[key] = helpers.array.pickMultiple(
          object.options ?? FALLBACKS.arrayElementOptions,
          count,
          object.unique ?? FALLBACKS.arrayElementsUnique
        );
        break;
      }
      default: {
        throw new Error(`Unknown field type: ${object.type}`);
      }
    }
  }

  return row as RecordReturnType<T>;
}

function generateRecords<T extends Record<string, FieldDefinition>>(
  fields: T,
  count: number
) {
  const rows: RecordReturnType<T>[] = [];

  for (let i = 0; i < count; i++) {
    rows.push(generateRecord(fields, { index: i }));
  }

  return rows;
}

export { generateRecord as record, generateRecords as records };
