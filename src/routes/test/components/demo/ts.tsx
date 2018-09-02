import * as React from "react";

export interface HelloProps {
	first: string
	last: string
}

export const Hello = (props: HelloProps) => <h1>Hello from {props.first} and {props.last}!</h1>;
