/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ status: 'Ok', version: '1.0.0' }));

Route.post('/login', 'AuthController.login').middleware('guest');
Route.post('/logout', 'AuthController.logout').middleware('auth');

Route.resource('products', 'ProductController')
  .apiOnly()
  .validator(new Map([[['products.store'], ['StoreProduct']], [['products.update'], ['StoreProduct']]]))
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']], [['update', 'destroy'], ['checkUser']]]));

Route.resource('types', 'TypeController')
  .apiOnly()
  .validator(new Map([[['types.store'], ['StoreType']], [['types.update'], ['StoreType']]]))
  .middleware(['auth', 'is:admin']);

Route.resource('types.attributes', 'AttributeController')
  .apiOnly()
  .validator(
    new Map([[['types.attributes.store'], ['StoreAttribute']], [['types.attributes.update'], ['StoreAttribute']]])
  )
  .middleware(['auth', 'is:admin']);
