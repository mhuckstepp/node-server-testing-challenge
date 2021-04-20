const server = require("./server");
const supertest = require("supertest");

describe("sanity check", () => {
  test("sanity check", () => {
    expect(true).toBe(true);
  });
});

const useSuper = supertest(server);

let data = [0, 1, 2, 3, 4, 5];

describe("api responses from server", () => {
  beforeEach(() => {
    data = [0, 1, 2, 3, 4, 5];
  });
  test("hit server", async () => {
    await useSuper.get("/").then((res) => {
      expect(res.text).toMatch(/running/);
      expect(res.status).toBe(200);
    });
  });
  test("GET from server", async () => {
    await useSuper.get("/api").expect((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(6);
    });
  });
  test("Post to server", async () => {
    const res = await useSuper
      .post("/api")
      .send({ user: "Pinky", password: 1234 });
    expect(res.status).toBe(201);
    expect(res.body[res.body.length - 1]).toBe(6);
  });
  test("Post to server", async () => {
    await useSuper
      .post("/api")
      .send({
        latitude: 12,
        longitude: 12,
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });
  test("DELETE", async () => {
    const res = await useSuper.delete("/api");
    expect(res.body).toHaveLength(6);
  });
});

module.exports = {
  data,
};
