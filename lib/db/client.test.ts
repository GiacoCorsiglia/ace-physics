import { unwrap } from "@/result";
import { client } from "./client";
import { Keys, tableName } from "./table";
import { setupDB } from "./test-helpers";

// This file is also a test of the test-helpers.
const { it, describe } = setupDB();

describe("tableName()", () => {
  it("is mocked", () => {
    expect(tableName().startsWith("Test_")).toBeTruthy();
  });
});

describe("db.client()", () => {
  it("wraps methods", async () => {
    const Item = {
      [Keys.pk]: "test1",
      [Keys.sk]: "test1",
      otherAttr: "other1",
    };

    const putResult = await client().put({
      TableName: tableName(),
      Item,
    });

    expect(putResult.failed).toBeFalsy();

    const getResult = await client().get({
      TableName: tableName(),
      Key: {
        [Keys.pk]: Item[Keys.pk],
        [Keys.sk]: Item[Keys.sk],
      },
    });

    expect(getResult.failed).toBeFalsy();
    expect(unwrap(getResult).Item).toEqual(Item);
  });
});

describe("DB isolation in tests", () => {
  const Item1 = {
    [Keys.pk]: "test1",
    [Keys.sk]: "test1",
  };

  const Item2 = {
    [Keys.pk]: "test2",
    [Keys.sk]: "test2",
  };

  it("Test 1", async () => {
    expect(
      (
        await client().put({
          TableName: tableName(),
          Item: Item1,
        })
      ).failed
    ).toBeFalsy();

    expect(
      unwrap(
        await client().get({
          TableName: tableName(),
          Key: Item2,
        })
      ).Item
    ).toBeFalsy();
  });

  it("Test 2", async () => {
    expect(
      (
        await client().put({
          TableName: tableName(),
          Item: Item2,
        })
      ).failed
    ).toBeFalsy();

    expect(
      unwrap(
        await client().get({
          TableName: tableName(),
          Key: Item1,
        })
      ).Item
    ).toBeFalsy();
  });
});
