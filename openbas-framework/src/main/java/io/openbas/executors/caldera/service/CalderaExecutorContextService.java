package io.openbas.executors.caldera.service;

import io.openbas.database.model.Asset;
import io.openbas.database.model.Injector;
import io.openbas.executors.caldera.client.CalderaExecutorClient;
import io.openbas.executors.caldera.client.model.Ability;
import io.openbas.integrations.InjectorService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log
@Service
public class CalderaExecutorContextService {

    private InjectorService injectorService;

    private CalderaExecutorClient calderaExecutorClient;

    @Autowired
    public void setInjectorService(InjectorService injectorService) {
        this.injectorService = injectorService;
    }

    @Autowired
    public void setCalderaExecutorClient(CalderaExecutorClient calderaExecutorClient) {
        this.calderaExecutorClient = calderaExecutorClient;
    }

    public final Map<String, Ability> injectorExecutorAbilities = new HashMap<>();
    public final Map<String, Ability> injectorExecutorClearAbilities = new HashMap<>();

    public void registerAbilities() {
        // Create the abilities if not exist for all injectors that need it
        List<Ability> abilities = this.abilities();
        Iterable<Injector> injectors = injectorService.injectors();
        injectors.forEach(injector -> {
            if (injector.getExecutorCommands() != null) {
                List<Ability> filteredAbilities = abilities.stream().filter(ability -> ability.getName().equals("caldera-subprocessor-" + injector.getName())).toList();
                if (!filteredAbilities.isEmpty()) {
                    Ability existingAbility = filteredAbilities.getFirst();
                    calderaExecutorClient.deleteAbility(existingAbility);
                }
                Ability ability = calderaExecutorClient.createSubprocessorAbility(injector);
                this.injectorExecutorAbilities.put(injector.getId(), ability);
            }
            if (injector.getExecutorClearCommands() != null) {
                List<Ability> filteredAbilities = abilities.stream().filter(ability -> ability.getName().equals("caldera-clear-" + injector.getName())).toList();
                if (!filteredAbilities.isEmpty()) {
                    Ability existingAbility = filteredAbilities.getFirst();
                    calderaExecutorClient.deleteAbility(existingAbility);
                }
                Ability ability = calderaExecutorClient.createClearAbility(injector);
                this.injectorExecutorClearAbilities.put(injector.getId(), ability);
            }
        });
    }

    public void launchExecutorSubprocess(@NotNull final Injector injector, @NotNull final Asset asset) {
        if (this.injectorExecutorAbilities.containsKey(injector.getId())) {
            calderaExecutorClient.exploit("base64", asset.getExternalReference(), this.injectorExecutorAbilities.get(injector.getId()).getAbility_id());
        }
    }

    public void launchExecutorClear(@NotNull final Injector injector, @NotNull final Asset asset) {
        if (this.injectorExecutorAbilities.containsKey(injector.getId())) {
            calderaExecutorClient.exploit("base64", asset.getExternalReference(), this.injectorExecutorClearAbilities.get(injector.getId()).getAbility_id());
        }
    }

    private List<Ability> abilities() {
        return calderaExecutorClient.abilities();
    }
}
