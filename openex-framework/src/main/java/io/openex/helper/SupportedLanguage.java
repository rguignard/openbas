package io.openex.helper;

public enum SupportedLanguage {
    fr, en;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}