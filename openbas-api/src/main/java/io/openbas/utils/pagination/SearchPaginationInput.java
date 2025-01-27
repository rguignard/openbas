package io.openbas.utils.pagination;

import io.openbas.database.model.Filters.FilterGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SearchPaginationInput {

  @Schema(description = "Page number to get")
  @Min(0) int page = 0;

  @Schema(description = "Element number by page")
  @Max(1000) int size = 10;

  @Schema(description = "Filter object to search within filterable attributes")
  private FilterGroup filterGroup;

  @Schema(description = "Text to search within searchable attributes")
  private String textSearch;

  @Schema(description = "List of sort fields : a field is composed of a property (for instance \"label\" and an optional direction (\"asc\" is assumed if no direction is specified) : (\"desc\", \"asc\")")
  private List<SortField> sorts = new ArrayList<>();

}
