package io.openbas.database.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import io.openbas.database.audit.ModelBaseListener;
import io.openbas.helper.MonoIdDeserializer;
import io.openbas.helper.MultiIdDeserializer;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.time.Instant.now;

@Getter
@Setter
@Entity
@Table(name = "lessons_categories")
@EntityListeners(ModelBaseListener.class)
public class LessonsCategory implements Base {
    @Id
    @Column(name = "lessons_category_id")
    @GeneratedValue(generator = "UUID")
    @UuidGenerator
    @JsonProperty("lessonscategory_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lessons_category_exercise")
    @JsonSerialize(using = MonoIdDeserializer.class)
    @JsonProperty("lessons_category_exercise")
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lessons_category_scenario")
    @JsonSerialize(using = MonoIdDeserializer.class)
    @JsonProperty("lessons_category_scenario")
    private Scenario scenario;

    @Column(name = "lessons_category_created_at")
    @JsonProperty("lessons_category_created_at")
    private Instant created = now();

    @Column(name = "lessons_category_updated_at")
    @JsonProperty("lessons_category_updated_at")
    private Instant updated = now();

    @Column(name = "lessons_category_name")
    @JsonProperty("lessons_category_name")
    private String name;

    @Column(name = "lessons_category_description")
    @JsonProperty("lessons_category_description")
    private String description;

    @Column(name = "lessons_category_order")
    @JsonProperty("lessons_category_order")
    private int order;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "lessons_categories_teams",
            joinColumns = @JoinColumn(name = "lessons_category_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id"))
    @JsonSerialize(using = MultiIdDeserializer.class)
    @JsonProperty("lessons_category_teams")
    private List<Team> teams = new ArrayList<>();

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @JsonProperty("lessons_category_questions")
    @JsonSerialize(using = MultiIdDeserializer.class)
    private List<LessonsQuestion> questions = new ArrayList<>();

    // region transient
    @JsonProperty("lessons_category_users")
    public List<String> getUsers() {
        return getTeams().stream().flatMap(team -> team.getUsers().stream().map(User::getId)).toList();
    }
    // endregion

    @Override
    public boolean isUserHasAccess(User user) {
        return getExercise().isUserHasAccess(user);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || !Base.class.isAssignableFrom(o.getClass())) return false;
        Base base = (Base) o;
        return id.equals(base.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
