import { workspace } from "vscode";

// https://github.com/redhat-developer/vscode-java/blob/f598b7938c771987b0da0f85225540ed9af6ffca/src/utils.ts#L100-L112
export function getExclusionGlob(): string {
    // This setting (java.import.exclusions) is shared with the vscode-java
    // extension. The schema is defined there rather than in this extension.
    //
    // If a user installs this extension (vscode-java-dependency) but not
    // vscode-java, the java.import.exclusions config in VS Code settings.json
    // will appear unused.
    const exclusions: string[] = workspace.getConfiguration('java').get<string[]>("import.exclusions", []);

    const patterns: string[] = [];
    for (const exclusion of exclusions) {
        if (exclusion.startsWith("!")) {
            continue;
        }

        patterns.push(exclusion);
    }
    return parseToStringGlob(patterns);
}

function parseToStringGlob(patterns: string[]): string {
    if (!patterns || patterns.length === 0) {
        return "";
    }

    return `{${patterns.join(",")}}`;
}
