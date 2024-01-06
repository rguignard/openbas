package io.openex.rest.exercise.form;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

import static io.openex.config.AppConfig.MANDATORY_MESSAGE;

public class ExerciseTeamPlayersEnableInput {
    @JsonProperty("exercise_team_players")
    private List<String> playersIds = new ArrayList<>();

    public List<String> getPlayersIds() {
        return playersIds;
    }

    public void setPlayersIds(List<String> playersIds) {
        this.playersIds = playersIds;
    }
}