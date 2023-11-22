package io.openex.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpHeaders.REFERER;

public class SsoRefererAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

  private RequestCache requestCache = new HttpSessionRequestCache();

  @Override
  public void onAuthenticationFailure(
      HttpServletRequest request,
      HttpServletResponse response,
      AuthenticationException exception) throws ServletException, IOException {
    this.saveException(request, exception);
    SavedRequest savedRequest = this.requestCache.getRequest(request, response);
    if (savedRequest != null) {
      List<String> refererValues = savedRequest.getHeaderValues(REFERER);
      if (refererValues.size() == 1) {
        this.getRedirectStrategy().sendRedirect(request, response, refererValues.get(0)+"?error="+exception.getMessage());
        return;
      }
    }
    super.onAuthenticationFailure(request, response, exception);
  }

  public void setRequestCache(RequestCache requestCache) {
    this.requestCache = requestCache;
  }
}