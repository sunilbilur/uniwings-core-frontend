import { HttpInterceptorFn } from '@angular/common/http';
import { active } from '@cds/core/internal';

export const adminQueryInterceptor: HttpInterceptorFn = (req, next) => {
  const activeIid: any = localStorage.getItem('active_iid');
  const iid: any = localStorage.getItem('iid');

  console.log("IID: ", iid, activeIid);

  if (req.method === 'GET' || req.method === 'POST') {
    const params = req.params.set('iid', activeIid!==null?activeIid:iid);
    return next(req.clone({ params }));
  }

  return next(req);
};
