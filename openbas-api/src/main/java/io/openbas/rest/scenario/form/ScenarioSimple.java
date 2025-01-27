package io.openbas.rest.scenario.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import io.openbas.database.model.Scenario;
import io.openbas.database.model.Tag;
import io.openbas.helper.MultiIdDeserializer;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

@Data
public class ScenarioSimple {

  @JsonProperty("scenario_id")
  private String id;

  @JsonProperty("scenario_name")
  private String name;

  @JsonProperty("scenario_subtitle")
  private String subtitle;

  @JsonSerialize(using = MultiIdDeserializer.class)
  @JsonProperty("scenario_tags")
  private List<Tag> tags = new ArrayList<>();

  public static ScenarioSimple fromScenario(@NotNull final Scenario scenario) {
    ScenarioSimple simple = new ScenarioSimple();
    BeanUtils.copyProperties(scenario, simple);
    return simple;
  }

}
