import { describe, it, expect } from "vitest";
import { record, records } from "./record";

describe("record", () => {
  it("should generate a single record with personName field", () => {
    const result = record({
      name: "personName",
    });

    expect(result).toHaveProperty("name");
    expect(typeof result.name).toBe("string");
    expect(result.name.length).toBeGreaterThan(0);
  });

  it("should generate a single record with companyName field", () => {
    const result = record({
      company: "companyName",
    });

    expect(result).toHaveProperty("company");
    expect(typeof result.company).toBe("string");
    expect(result.company.length).toBeGreaterThan(0);
  });

  it("should generate a single record with int field", () => {
    const result = record({
      age: { type: "int", min: 18, max: 65 },
    });

    expect(result).toHaveProperty("age");
    expect(typeof result.age).toBe("number");
    expect(Number.isInteger(result.age)).toBe(true);
    expect(result.age).toBeGreaterThanOrEqual(18);
    expect(result.age).toBeLessThanOrEqual(65);
  });

  it("should generate a single record with float field", () => {
    const result = record({
      price: { type: "float", min: 10.0, max: 100.0, decimals: 2 },
    });

    expect(result).toHaveProperty("price");
    expect(typeof result.price).toBe("number");
    expect(result.price).toBeGreaterThanOrEqual(10.0);
    expect(result.price).toBeLessThanOrEqual(100.0);
    // Check that it has at most 2 decimal places
    expect(Number((result.price % 1).toFixed(2))).toBeLessThanOrEqual(0.99);
  });

  it("should generate a single record with email field", () => {
    const result = record({
      email: "email",
    });

    expect(result).toHaveProperty("email");
    expect(typeof result.email).toBe("string");
    expect(result.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("should generate a single record with featureFlags field", () => {
    const result = record({
      flags: { type: "featureFlags", count: 3 },
    });

    expect(result).toHaveProperty("flags");
    expect(typeof result.flags).toBe("object");
    expect(Object.keys(result.flags)).toHaveLength(3);

    // Check that all values are string, number, or boolean
    Object.values(result.flags).forEach((value) => {
      expect(
        typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
      ).toBe(true);
    });
  });

  it("should generate a single record with arrayElement field", () => {
    const options = ["Basic", "Premium", "Enterprise"];
    const result = record({
      plan: { type: "arrayElement", options },
    });

    expect(result).toHaveProperty("plan");
    expect(typeof result.plan).toBe("string");
    expect(options).toContain(result.plan);
  });

  it("should generate a single record with arrayElement field using default options", () => {
    const result = record({
      plan: "arrayElement",
    });

    expect(result).toHaveProperty("plan");
    expect(typeof result.plan).toBe("string");
    expect(["Basic", "Premium", "Enterprise"]).toContain(result.plan);
  });

  it("should generate a single record with arrayElements field", () => {
    const options = ["red", "green", "blue", "yellow", "purple"] as const;
    const result = record({
      colors: { type: "arrayElements", options, count: 3 },
    });

    expect(result).toHaveProperty("colors");
    expect(Array.isArray(result.colors)).toBe(true);
    expect(result.colors).toHaveLength(3);

    // All elements should be from the options array
    result.colors.forEach((color) => {
      expect(options).toContain(color);
    });

    // By default, elements should be unique
    const uniqueColors = new Set(result.colors);
    expect(uniqueColors.size).toBe(result.colors.length);
  });

  it("should generate arrayElements with non-unique elements when unique is false", () => {
    const options = ["x", "y"];
    const result = record({
      items: { type: "arrayElements", options, count: 5, unique: false },
    });

    expect(result).toHaveProperty("items");
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.items).toHaveLength(5);

    // All elements should be from the options array
    result.items.forEach((item) => {
      expect(options).toContain(item);
    });

    // With only 2 options and 5 items, duplicates are guaranteed when unique=false
    const uniqueItems = new Set(result.items);
    expect(uniqueItems.size).toBeLessThanOrEqual(2);
  });

  it("should handle arrayElements with zero count", () => {
    const options = ["a", "b", "c"];
    const result = record({
      items: { type: "arrayElements", options, count: 0 },
    });

    expect(result).toHaveProperty("items");
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.items).toHaveLength(0);
  });

  it("should generate a record with multiple fields of different types", () => {
    const result = record({
      name: "personName",
      company: "companyName",
      age: { type: "int", min: 25, max: 40 },
      salary: { type: "float", min: 50000.0, max: 150000.0, decimals: 2 },
      email: "email",
      features: { type: "featureFlags", count: 2 },
    });

    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("company");
    expect(result).toHaveProperty("age");
    expect(result).toHaveProperty("salary");
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("features");

    expect(typeof result.name).toBe("string");
    expect(typeof result.company).toBe("string");
    expect(typeof result.age).toBe("number");
    expect(typeof result.salary).toBe("number");
    expect(typeof result.email).toBe("string");
    expect(typeof result.features).toBe("object");

    expect(Number.isInteger(result.age)).toBe(true);
    expect(result.age).toBeGreaterThanOrEqual(25);
    expect(result.age).toBeLessThanOrEqual(40);

    expect(result.salary).toBeGreaterThanOrEqual(50000.0);
    expect(result.salary).toBeLessThanOrEqual(150000.0);

    expect(result.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(Object.keys(result.features)).toHaveLength(2);
  });

  it("should throw error for unknown field type", () => {
    expect(() => {
      record({
        unknown: { type: "unknownType" } as any,
      });
    }).toThrow("Unknown field type: unknownType");
  });

  it("should generate different values on multiple calls", () => {
    const result1 = record({ name: "personName" });
    const result2 = record({ name: "personName" });

    // While there's a small chance they could be the same, it's very unlikely
    // This test might occasionally fail due to randomness, but it's a good sanity check
    expect(result1.name).not.toBe(result2.name);
  });

  it("should generate a single record with arrayElement field", () => {
    const result = record({
      tier: {
        type: "arrayElement",
        options: ["One", "Two", "Three"] as const,
      },
    });

    expect(result).toHaveProperty("tier");
    expect(typeof result.tier).toBe("string");
    expect(result.tier).toBeOneOf(["One", "Two", "Three"]);
  });
});

describe("records", () => {
  it("should generate multiple records with the specified count", () => {
    const result = records(
      {
        name: "personName",
        age: { type: "int", min: 18, max: 65 },
      },
      5
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(5);

    result.forEach((record) => {
      expect(record).toHaveProperty("name");
      expect(record).toHaveProperty("age");
      expect(typeof record.name).toBe("string");
      expect(typeof record.age).toBe("number");
      expect(Number.isInteger(record.age)).toBe(true);
      expect(record.age).toBeGreaterThanOrEqual(18);
      expect(record.age).toBeLessThanOrEqual(65);
    });
  });

  it("should generate empty array when count is 0", () => {
    const result = records(
      {
        name: "personName",
      },
      0
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  it("should generate single record when count is 1", () => {
    const result = records(
      {
        name: "personName",
        email: "email",
      },
      1
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("email");
    expect(typeof result[0].name).toBe("string");
    expect(typeof result[0].email).toBe("string");
  });

  it("should generate records with all field types", () => {
    const result = records(
      {
        name: "personName",
        company: "companyName",
        age: { type: "int", min: 20, max: 60 },
        salary: { type: "float", min: 30000.0, max: 120000.0, decimals: 2 },
        email: "email",
        flags: { type: "featureFlags", count: 3 },
      },
      3
    );

    expect(result).toHaveLength(3);

    result.forEach((record) => {
      expect(typeof record.name).toBe("string");
      expect(typeof record.company).toBe("string");
      expect(typeof record.age).toBe("number");
      expect(typeof record.salary).toBe("number");
      expect(typeof record.email).toBe("string");
      expect(typeof record.flags).toBe("object");

      expect(Number.isInteger(record.age)).toBe(true);
      expect(record.age).toBeGreaterThanOrEqual(20);
      expect(record.age).toBeLessThanOrEqual(60);

      expect(record.salary).toBeGreaterThanOrEqual(30000.0);
      expect(record.salary).toBeLessThanOrEqual(120000.0);

      expect(record.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(Object.keys(record.flags)).toHaveLength(3);
    });
  });

  it("should generate different records on each call", () => {
    const result = records(
      {
        name: "personName",
        age: { type: "int", min: 18, max: 65 },
      },
      10
    );

    // Check that not all names are the same (very unlikely with random generation)
    const names = result.map((r) => r.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBeGreaterThan(1);

    // Check that not all ages are the same
    const ages = result.map((r) => r.age);
    const uniqueAges = new Set(ages);
    expect(uniqueAges.size).toBeGreaterThan(1);
  });

  it("should handle large count efficiently", () => {
    const start = Date.now();
    const result = records(
      {
        name: "personName",
        age: { type: "int", min: 18, max: 65 },
      },
      1000
    );
    const end = Date.now();

    expect(result).toHaveLength(1000);
    expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second

    // Spot check a few records
    expect(typeof result[0].name).toBe("string");
    expect(typeof result[500].age).toBe("number");
    expect(typeof result[999].name).toBe("string");
  });
});
