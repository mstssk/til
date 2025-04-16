import * as ts from "npm:typescript";

const file = Deno.readTextFileSync("./example.ts");

const sourceFile = ts.createSourceFile(
  "dummy.ts",
  file,
  ts.ScriptTarget.Latest
);

// TypeScript ASTからconfigという変数宣言をを探す
const configDeclaration = sourceFile.statements.find(
  (statement) =>
    ts.isVariableStatement(statement) &&
    statement.declarationList.declarations.some(
      (declaration) =>
        ts.isIdentifier(declaration.name) && declaration.name.text === "config"
    )
);
if (!configDeclaration) {
  throw new Error("config declaration not found");
}
console.log("configDeclaration", configDeclaration);
