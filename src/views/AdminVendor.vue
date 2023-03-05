<template>
  <Navbar />

  <section id="forms" class="forms">
    <div class="container">
      <div class="section-title d-flex justify-content-between">
        <p>Test display data here</p>
        {{ test }} is here
        <h1 class="text-main-blue">{company name}</h1>
        <div
          class="btn-group mt-auto shadow-0"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-toggle="modal"
            href="#allusers"
          >
            All Users
          </button>

          <div
            class="modal fade"
            id="allusers"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
            tabindex="-1"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="allusersLabel">List of Users</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body" id="usermodal">
                  <table
                    class="table align-middle mb-0 bg-white"
                    id="usertable"
                  >
                    <thead class="bg-light">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p class="fw-normal mb-1">1</p>
                        </td>
                        <td>
                          <p class="fw-bold mb-1">John Doe</p>
                          <p class="text-muted mb-0">john.doe@gmail.com</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p class="fw-normal mb-1">2</p>
                        </td>
                        <td>
                          <p class="fw-bold mb-1">John Doe</p>
                          <p class="text-muted mb-0">john.doe@gmail.com</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p class="fw-normal mb-1">1</p>
                        </td>
                        <td>
                          <p class="fw-bold mb-1">John Doe</p>
                          <p class="text-muted mb-0">john.doe@gmail.com</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p class="fw-normal mb-1">1</p>
                        </td>
                        <td>
                          <p class="fw-bold mb-1">John Doe</p>
                          <p class="text-muted mb-0">john.doe@gmail.com</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p class="fw-normal mb-1">1</p>
                        </td>
                        <td>
                          <p class="fw-bold mb-1">John Doe</p>
                          <p class="text-muted mb-0">john.doe@gmail.com</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-primary"
                    data-bs-target="#addusers"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Add users
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="addusers"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabindex="-1"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="addusersLabel">Add users</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body text-center">
                  <input
                    class="form-control"
                    list="datalistOptions"
                    id="users"
                    placeholder="Type to search..."
                  />
                  <datalist id="datalistOptions">
                    <option value="john"></option>
                    <option value="Mary"></option>
                    <option value="may"></option>
                    <option value="ss"></option>
                    <option value="iii"></option>
                  </datalist>

                  <button
                    class="btn btn-outline-primary mt-3 px-5"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    @click="addUsers"
                  >
                    Add
                  </button>
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    data-bs-target="#allusers"
                  >
                    See users
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-toggle="modal"
            href="#addusers"
          >
            Add Users
          </button>

          <div class="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Add Forms
            </button>
            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <li>
                <a class="dropdown-item" href="/formbuilder">Create new form</a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#templatelist"
                  >Choose from templates</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Modal for templates -->
      <div
        class="modal fade"
        id="templatelist"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="choosetemplateLabel">
                Choose Template
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" id="templatemodal">
              <div class="box">
                <div class="container">
                  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card template-box">
                        <div class="card-body">
                          <h6 class="card-title">Form 1231</h6>
                          <p class="card-text">
                            Form description: <br />Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Rem magni quas ex
                            numqu.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Add template
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card text-white bg-primary mt-5 mb-4 py-2 text-center">
        <div class="card-body">
          <h4 class="text-white m-0">
            Assigned (Vendor fill in Stage) | Waiting for vendor response
          </h4>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card text-white bg-primary mt-5 mb-4 py-2 text-center">
        <div class="card-body">
          <h4 class="text-white m-0">
            Awaiting Evaluation (Admin stage) | Waiting for both admin to fill
            and evaluate
          </h4>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card text-white bg-primary mt-5 mb-4 py-2 text-center">
        <div class="card-body">
          <h4 class="text-white m-0">
            Awaiting Approval (approver stage) | Waiting for approval to
            approve, completed / rejected
          </h4>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">Form 1231</h2>
              <p class="card-text">
                Form description: <br />Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rem magni quas ex numquam, maxime minus quam
                molestias corporis quod, ea minima accusamus.
              </p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-6 pr-0">
                  <button
                    class="btn btn-link btn-block"
                    data-bs-toggle="modal"
                    data-bs-target="#assign"
                  >
                    Assign
                  </button>
                </div>
                <!-- modal -->
                <div
                  class="modal fade"
                  id="assign"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Assign To
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          class="form-control"
                          list="datalistOptions"
                          id="users"
                          placeholder="Type to search..."
                        />
                        <datalist id="datalistOptions">
                          <option value="john"></option>
                          <option value="Mary"></option>
                          <option value="may"></option>
                          <option value="ss"></option>
                          <option value="iii"></option>
                        </datalist>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 pl-0">
                  <button class="btn btn-link btn-block">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col mt-4"></div>
        <!-- empty column -->
      </div>
    </div>
  </section>
</template>

<script>
import TemplateList from "../components/template/TemplateList.vue";
import Navbar from "../components/navbar/Navbar.vue";
import UserService from "../services/userService";
import FormComponent from "../components/form/FormComponent.vue";
import SectionComponent from "../components/form/SectionComponent.vue";
import { useTemplateStore } from "../stores/templateStore";
import { onMounted, ref, watch } from "vue";

export default {
  components: {
    Navbar,
    FormComponent,
    TemplateList,
    SectionComponent,
  },
  setup(props) {
    const countryDetails = ref(props.details);

    var content = ref("");

    UserService.getUserBoard().then(
      (response) => {
        content.value = response.data;
        console.log("Userboard response is " + response.data);
      },
      (error) => {
        content.value =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );

    //get template data from templatestore
    var templates = useTemplateStore();
    var test = ref(null);
    templates.getTemplates();

    watch((test) => {});

    test.value = templates.getTemplates();

    //temporary template data
    // var templates = [
    //   {
    //     templateInfo: {
    //       templateName: "New Vendor Assessment Form",
    //       assignedTo: "Vendor",
    //       templateDesc: "Assessment for new vendors",
    //     },
    //     templateContents: [
    //       {
    //         Vendor: [
    //           {
    //             type: "header",
    //             order: 0,
    //             text: "NEW VENDOR ASSESSMENT FORM",
    //             style: "h1",
    //           },
    //           { type: "text", order: 1, text: "Company's Name" },
    //           { type: "number", order: 2, text: "Company Registration No:" },
    //           { type: "text", order: 3, text: "Office Address" },
    //           { type: "boolean", order: 4, text: "GST Registered" },
    //           { type: "number", order: 5, text: "Tel" },
    //           { type: "text", order: 6, text: "Fax" },
    //           {
    //             type: "checkbox",
    //             order: 7,
    //             text: "Type of business License/Registration",
    //             options: [
    //               "Sole Proprietorship",
    //               "Limited Company",
    //               "Partnership Agreement",
    //               "Others",
    //             ],
    //           },
    //           {
    //             type: "header",
    //             order: 0,
    //             text: "Contact Person",
    //             style: "h1",
    //           },
    //           { type: "text", order: 8, text: "Contact Name" },
    //           { type: "number", order: 9, text: "Contact Tel" },
    //           { type: "text", order: 10, text: "Contact Designation" },
    //           {
    //             type: "checkbox",
    //             order: 11,
    //             text: "Nature of Business",
    //             options: [
    //               "Manufacturing",
    //               "Agent/dealer",
    //               "Distributor",
    //               "Others",
    //             ],
    //           },
    //           {
    //             type: "text",
    //             order: 12,
    //             text: "If you picked Others please specify the nature of your business",
    //           },
    //         ],
    //       },
    //       {
    //         Admin: [
    //           {
    //             type: "header",
    //             order: 0,
    //             text: "NEW VENDOR ASSESSMENT FORM",
    //             style: "h1",
    //           },
    //           { type: "boolean", order: 2, text: "ISO 9001 Certification" },
    //           { type: "text", order: 3, text: "Certification Body" },
    //           {
    //             type: "boolean",
    //             order: 4,
    //             text: "Accreditation of Laboratory",
    //           },
    //           { type: "text", order: 5, text: "Accreditation Body" },
    //           { type: "boolean", order: 6, text: "Product Certification" },
    //           {
    //             type: "text",
    //             order: 7,
    //             text: "Product Markings (e.g. PSB, UL, TUV)",
    //           },
    //           { type: "boolean", order: 8, text: "Site Evaluation Results" },
    //           {
    //             type: "checkbox",
    //             order: 9,
    //             text: "Site Evaluation Results",
    //             options: ["Satisfactory", "Unsatisfactory"],
    //           },
    //           {
    //             type: "boolean",
    //             order: 10,
    //             text: "Results of Samples/Product Evaluation",
    //           },
    //           {
    //             type: "checkbox",
    //             order: 11,
    //             text: "Results of Samples/Product Evaluation",
    //             options: ["Satisfactory", "Unsatisfactory"],
    //           },
    //           { type: "boolean", order: 12, text: "Results of First Deal" },
    //           {
    //             type: "checkbox",
    //             order: 13,
    //             text: "Results of First Deal",
    //             options: ["Satisfactory", "Unsatisfactory"],
    //           },
    //           {
    //             type: "boolean",
    //             order: 14,
    //             text: "Track Record Review/ Customer Reference",
    //           },
    //           {
    //             type: "checkbox",
    //             order: 15,
    //             text: "Track Record Review/ Customer Reference",
    //             options: ["Satisfactory", "Unsatisfactory"],
    //           },
    //           {
    //             type: "boolean",
    //             order: 16,
    //             text: "Other Evaluation",
    //           },
    //           {
    //             type: "text",
    //             order: 17,
    //             text: "Specify: Product Markings (e.g. PSB, UL, TUV)",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ];

    // var templates = useTemplateStore();
    console.log("current templates are", templates);

    var formName = ref("");
    var assignedTo = ref("Vendor");
    var desc = ref("Enter form description here.");
    var formItems = ref([]);
    var formSections = ref([]);

    var addAdminSection = () => {
      formSections.value.push({
        admin: [],
      });
    };
    var addVendorSection = () => {
      formSections.value.push({
        vendor: [],
      });
    };

    function addTextInput() {
      formItems.value.push({
        type: "text",
        order: formItems.value.length,
        text: "",
      });
    }
    function addCheckboxInput() {
      formItems.value.push({
        type: "checkbox",
        order: formItems.value.length,
        text: "",
        options: [],
      });
    }
    function addRadioInput() {
      formItems.value.push({
        type: "radio",
        order: formItems.value.length,
        text: "",
        options: [],
      });
    }
    function addHeaderText() {
      formItems.value.push({
        type: "header",
        order: formItems.value.length,
        text: "",
        style: "h1",
      });
    }
    function addBooleanInput() {
      formItems.value.push({
        type: "boolean",
        order: formItems.value.length,
        text: "",
      });
    }
    function addDateInput() {
      formItems.value.push({
        type: "date",
        order: formItems.value.length,
        text: "",
      });
    }
    function addNumberInput() {
      formItems.value.push({
        type: "number",
        order: formItems.value.length,
        text: "",
      });
    }
    function addLikertGroupInput() {
      formItems.value.push({
        type: "likertGroup",
        order: formItems.value.length,
        text: "",
        options: [],
      });
    }

    var addTemplate = (template) => {
      // console.log("template received is", template);
      for (let i = 0; i < template.templateContents.length; i++) {
        var section = template.templateContents[i];
        formSections.value.push(section);
        // let key = Object.keys(section)[0];
        // console.log(section[key]);
        // section[key].forEach((element) => {
        //   formItems.value.push(element);
        // });
      }
    };

    function update() {
      //Uncomment this out to check
      console.log("parent checking the state of the form", formSections);
    }

    // Text, Text,  Radio
    // Text, Radio
    function removeQuestion(questionKey) {
      //Remove from formItems first
      formItems.value.splice(questionKey, 1);
    }

    function exportForm() {
      //Packages the form content into a JSON string
      //This is where we write the ajax code
      const outputObj = {
        templateInfo: {
          templateName: formName.value,
          assignedTo: assignedTo.value,
          templateDesc: desc.value,
        },
        templateContents: formSections.value,
      };

      console.log(outputObj);
      const outputJson = JSON.stringify(outputObj);
      console.log(outputJson);

      //for adding template to mongoDB
      // templates.addTemplate(outputObj);
      // console.log("-----------------------------------------");
      // console.log("Form has been exported, details below:");
      // console.log("Form name: " + formName.value);
      // console.log("Form assigned to: " + assignedTo.value);
      // console.log("Form desc: " + desc.value);
      // console.log("--------------Form Contents--------------");
      // console.log(formItems.value);
      // console.log("-----------------------------------------");
    }

    return {
      test,
      content,
      formItems,
      formName,
      assignedTo,
      desc,
      formSections,
      addTextInput,
      addHeaderText,
      addCheckboxInput,
      addRadioInput,
      addBooleanInput,
      addDateInput,
      addNumberInput,
      addLikertGroupInput,
      update,
      removeQuestion,
      exportForm,
      addTemplate,
      addAdminSection,
      addVendorSection,
    };
  },
};
</script>
