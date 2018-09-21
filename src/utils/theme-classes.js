import cn from 'classnames';

export default function (base, ...classes) {
  const f = (...classes) => {
    return base + cn(classes).replace(/(\s+)/g, `$1${base}`);
  };
  return classes && classes.length ? f(classes) : f;
}
