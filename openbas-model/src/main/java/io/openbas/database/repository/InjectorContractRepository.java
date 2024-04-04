package io.openbas.database.repository;

import io.openbas.database.model.InjectorContract;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InjectorContractRepository extends CrudRepository<InjectorContract, String> {

    @NotNull
    Optional<InjectorContract> findById(@NotNull String id);
}