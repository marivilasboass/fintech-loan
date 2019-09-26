import React from 'React'

export const getChildrenOfClass = (ComponentClass, children) => {
  const isElementFn = isOfComponentClass(ComponentClass)
  const filteredChildren = filterChildren(isElementFn)(children)

  return filteredChildren
}

export const isElementOfComponentClass = (ComponentClass, element) =>
  element.type === ComponentClass

export const isOfComponentClass = ComponentClass => element =>
  isElementOfComponentClass(ComponentClass, element)

export const filterElement = (isElementFn, childrenArray) =>
  childrenArray.filter(isElementFn)

export const filterChildren = isElementFn => children => {
  const childrenArray = React.Children.toArray(children)

  return filterElement(isElementFn, childrenArray)
}

export const isNotOfComponentClasses = ComponentClasses =>
  filterChildren(child =>
    !ComponentClasses.some(ComponentClass =>
      isElementOfComponentClass(ComponentClass, child)))
