package io.openbas.utils.fixtures;

import io.openbas.database.model.Inject;

import static io.openbas.injects.email.EmailContract.EMAIL_DEFAULT;
import static io.openbas.injects.email.EmailContract.TYPE;

public class InjectFixture {

  public static final String INJECT_EMAIL_NAME = "Test email inject";

  public static Inject getInjectForEmailContract() {
    Inject inject = new Inject();
    inject.setTitle(INJECT_EMAIL_NAME);
    inject.setType(TYPE);
    inject.setContract(EMAIL_DEFAULT);
    inject.setEnabled(true);
    inject.setDependsDuration(0L);
    return inject;
  }

}