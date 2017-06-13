
### object_literal Code Along:
Yep, it's pointing to the person object literal.

Why? Because the runtime Context of this function is
the person object literal.

Why? Because we invoked this function/method at RUNTIME like this 'person.fullName' below.

The Context is the object literal 'person'
The 'this' pointer in the fullName method is the object literal we defined above, 'person'.
