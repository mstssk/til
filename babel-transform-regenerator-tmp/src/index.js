import { BlockBlobClient } from "@azure/storage-blob";

console.log("foobar");

const client = new BlockBlobClient("");
console.log(client.name);
