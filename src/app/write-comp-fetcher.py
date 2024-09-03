import os

fetcher_file = open(os.path.join(os.path.dirname(__file__), "_services/comp-fetcher-dyn.service.ts"), "w")

fetcher_file.write(
"""import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompFetcherService {

  constructor(private http: HttpClient) {
  }

  async fetch(compName: any) {
    switch (compName) {\n""")

#recursively list out all files from app-components folder ending with .component.ts
for root, dirs, files in os.walk("./app-components"):
    for file in files:
        if file.endswith(".component.ts"):
            print ("file:",os.path.join(root, file))
            fetcher_file.write("\t\tcase '"+file.removesuffix(".component.ts")+"':\n")
            #if file is like feedback-mgmt-scheduler.component.ts, then convert it into FeedbackMgmtSchedulerComponent
            newCompName = ''.join([word.capitalize() for word in file.removesuffix(".ts").replace(".","-").split("-")])
            fetcher_file.write("\t\t\treturn (await import('."+os.path.join(root, file.removesuffix(".ts"))+"'))."+ newCompName+"\n")
            

fetcher_file.write("\t\tdefault:\n")
fetcher_file.write("\t\t\tthrow new Error(`Component not found for the given key.`);\n")

fetcher_file.write("\t\t}\n\t}\n}\n")

fetcher_file.close()

