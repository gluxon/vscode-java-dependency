import { workspace, WorkspaceConfiguration } from "vscode";

export function getJavaConfiguration(): WorkspaceConfiguration {
	return workspace.getConfiguration('java');
}

// https://github.com/redhat-developer/vscode-java/blob/f598b7938c771987b0da0f85225540ed9af6ffca/src/utils.ts#L100-L112
export function getExclusionGlob(): string {
    const config = getJavaConfiguration();
    const exclusions: string[] = config.get<string[]>("import.exclusions", []);
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
