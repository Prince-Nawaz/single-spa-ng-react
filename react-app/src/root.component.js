import { useEffect } from 'react';
import { getData, state$ } from '@app/utility';

export default function Root(props) {
  useEffect(() => {
    getData('/data').then((data) => {
      console.log('React', data);
    });

    const subscription = state$.subscribe((data) => {
      console.log('react rxjs state$', data);
    });
    state$.next({ data: 'React Data rxjs next' });
    sessionStorage.setItem('data', 'React => Session Storage');
    console.log('React setting sessionStorage', sessionStorage.getItem('data'));
    return () => {
      subscription.unsubscribe();
    };
  });
  return (
    <>
      <section>{props.name} is mounted!</section>
      <a href='#/angular'>Angular Micro Frontend</a>
    </>
  );
}
