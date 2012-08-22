require 'spec_helper'

describe Answer do
  it { should belong_to(:field) }
  it { should belong_to(:business) }
end
