// File: test/mustache.test.js
import Mustache from "mustache";

test ("menggunakan mustache", () => {
    const data = Mustache.render("Hello {{name}}", {name: "Charis"});
    expect(data).toBe("Hello Charis");
});

test ("menggunakan mustache cache", () => {
    Mustache.parse("Hello {{name}}");

    const data = Mustache.render("Hello {{name}}", {name: "Charis"});
    expect(data).toBe("Hello Charis");
});

test ("menggunakan mustache tags", () => {
    const data = Mustache.render("Hello {{name}} and my'hobby is {{{hobby}}}", {
        name: "Charis",
        hobby: "<b>Badminton</b>"
    });
    expect(data).toBe("Hello Charis and my'hobby is <b>Badminton</b>");
});