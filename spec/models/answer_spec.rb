require 'spec_helper'

describe FieldAnswer do
  it { should belong_to(:field) }
  it { should belong_to(:user) }
end
