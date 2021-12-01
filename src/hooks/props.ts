type ObjectType = {
  [index: string]: any;
};

type Action<Key> = {
  type: Key;
};

type ActionWithPayload<Map extends ObjectType, Key extends keyof Map> = {
  type: Key;
  payload: Map[Key];
};

type ActionMap<M extends ObjectType> = {
  [Key in keyof M]: M[Key] extends undefined
    ? Action<Key>
    : ActionWithPayload<M, Key>;
};

type ActionMapData<Payload extends ObjectType = ObjectType> =
  ActionMap<Payload>[keyof ActionMap<Payload>];

/**
 * @param state is readonly
 */
type Reducer<State, Payload extends ObjectType> = (
  state: State,
  action: Payload,
) => State;

export type {
  ObjectType,
  Action,
  ActionWithPayload,
  ActionMap,
  Reducer,
  ActionMapData,
};
