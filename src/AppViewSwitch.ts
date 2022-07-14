const enum ViewName {
  Fallback = 'Fallback',
  Pending = 'Pending',
  Test = 'Test',
  Login = 'Login',
  Main = 'Main',
}

const enum ViewTransitionType {
  None,
  SlideLeft,
  SlideRight,
  SlideUp,
  SlideDown,
}

export {
  ViewName,
  ViewTransitionType
}
