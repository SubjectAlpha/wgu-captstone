// this should satisfy the polymorphism requirement
type ReturnType = {
	int: number;
	char: string;
	bool: boolean;
};

export function getRandom<T extends "char" | "int" | "bool">(
	str: T
): ReturnType[T] {
    switch(str) {
        case ("int"):
            return Math.floor(Math.random() * 10) as ReturnType[T];
        case("bool"):
            return Boolean(Math.round(Math.random())) as ReturnType[T];
        default:
        case ("char"):
            return String.fromCharCode(
                97 + Math.floor(Math.random() * 26)
            ) as ReturnType[T];
    }
}
