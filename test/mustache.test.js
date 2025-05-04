// File: test/mustache.test.js
import Mustache from "mustache";
import fs from "fs/promises"
import mustache from "mustache";
import { name } from "mustache";

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

test ("mencoba list object", async () => {
    const template = await fs.readFile("./templates/student.mustache").then(data => data.toString());

    const data  = Mustache.render(template, {
        students: [
            {name: "Abdul", value: 100},
            {name: "Charis", value: 90}
        ]
    });

    console.log(data);
    expect(data).toContain("Abdul");
    expect(data).toContain("Charis");
    expect(data).toContain("100");
    expect(data).toContain("90"); 
});

test ("mencoba function ", async () => {

    const parameter = {
        name: "Charis",
        upper: () => {
            return (text, render) =>{
                return render(text).toUpperCase();
            }
        }
    }

    const data = Mustache.render("Hello {{#upper}}{{name}}{{/upper}}", parameter);
    expect(data).toBe("Hello CHARIS")
    
}); 

test ("mencoba comment", async () => {
    const template = await fs.readFile("./templates/comment.mustache").then(data => data.toString());

    const data  = Mustache.render(template, {
        comments: "Hallo ini adalah comment"
    });
        

    console.log(data);
    expect(data).toContain("Hallo ini adalah comment");
    expect(data).not.toContain(" ini komentar");
   
});

test ("mencoba partials", async () => {
    const contentTemplate = await fs.readFile("./templates/content.mustache").then(data => data.toString());

    const headerTemplate = await fs.readFile("./templates/header.mustache").then(data => data.toString());

    const footerTemplate = await fs.readFile("./templates/footer.mustache").then(data => data.toString());

    const data  = Mustache.render(contentTemplate, {
        title: "Belajar MustacheJS",
        content: "Hallo ini adalah content"
    },{
        header: headerTemplate,
        footer: footerTemplate
    });

    console.log(data);
    expect(data).toContain("Belajar MustacheJS");
    expect(data).toContain("Hallo ini adalah content");
    expect(data).toContain("Abdul Charis");

});