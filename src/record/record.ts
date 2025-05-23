import * as primitives from "../primitives";
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
            : T[K] extends { type: typeof TYPE.tier } | typeof TYPE.tier
              ? ReturnType<typeof primitives.tier>
              : never
    : T[K] extends { type: typeof TYPE.featureFlags } | typeof TYPE.featureFlags
      ? Record<string, string | number | boolean>
      : never;
};

function generateRecord<T extends Record<string, FieldDefinition>>(
  fields: T
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
      case TYPE.tier: {
        row[key] = primitives.tier();
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
    rows.push(generateRecord(fields));
  }

  return rows;
}

export { generateRecord as record, generateRecords as records };
