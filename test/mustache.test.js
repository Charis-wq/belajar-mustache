// File: test/mustache.test.js
import Mustache from "mustache";
import fs from "fs/promises"

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

test ("menggunakan mustache nasted object", () => {
    Mustache.parse("Hello {{name}}");

    const data = Mustache.render("Hello {{person.name}}", {
        person: {
            name: "Charis"
        }
    });
    expect(data).toBe("Hello Charis");
});

test ("mencoba mustache file", async () => {
    const template = await fs.readFile("./templates/hallo.mustache").then(data => data.toString());

    const data  = Mustache.render(template, {
        tittle: "Belajar Mustache"
    });

    console.log(data);
    expect(data).toContain("Belajar Mustache");
});

test ("mencoba mustache sections not show", async () => {
    const template = await fs.readFile("./templates/person.mustache").then(data => data.toString());

    const data  = Mustache.render(template, {
       
    });

    console.log(data);
    expect(data).not.toContain("Hello Person");
});

test ("mencoba mustache sections show", async () => {
    const template = await fs.readFile("./templates/person.mustache").then(data => data.toString());

    const data  = Mustache.render(template, {
        person: {
            name: "Charis",
        }
    });

    console.log(data);
    expect(data).toContain("Hallo Person");
});

test ("mencoba mustache sections data", async () => {
    const template = await fs.readFile("./templates/person.mustache").then(data => data.toString());

    const data  = Mustache.render(template, {
        person: {
            name: "Charis",
        }
    });

    console.log(data);
    expect(data).toContain("Hallo Person Charis!");
});

test ("mencoba mustache inverted sections", async () => {
    const template = await fs.readFile("./templates/person.mustache").then(data => data.toString());

    const data  = Mustache.render(template, {});

    console.log(data);
    expect(data).toContain("Hallo Gust");
});

test ("mencoba mustache list", async () => {
    const template = await fs.readFile("./templates/hobbies.mustache").then(data => data.toString());

    const data  = Mustache.render(template, {
        hobbies: ["badminton", "reading", "coding"]
    });

    console.log(data);
    expect(data).toContain("badminton");
    expect(data).toContain("reading");
    expect(data).toContain("coding");
});