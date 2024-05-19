type Routine = {
  name: string;
  description: string;
};

interface APIGETRoutine extends Routine {
  uri: string;
  params: {[key: string]: string}
  key: string;
}

interface APIPOSTRoutine extends Routine {
  uri: string;
  body: {[key: string]: string}
}